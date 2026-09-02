<?php

namespace EduManage\Core;

class Router {
    private array $routes = [];
    private array $groupMiddlewares = [];
    private string $groupPrefix = '';

    public function group(string $prefix, array $middlewares, callable $callback): void {
        $prevPrefix = $this->groupPrefix;
        $prevMiddlewares = $this->groupMiddlewares;

        $this->groupPrefix .= $prefix;
        $this->groupMiddlewares = array_merge($this->groupMiddlewares, $middlewares);

        call_user_func($callback, $this);

        $this->groupPrefix = $prevPrefix;
        $this->groupMiddlewares = $prevMiddlewares;
    }

    public function get(string $path, $handler, array $middlewares = []): void {
        $this->addRoute('GET', $path, $handler, $middlewares);
    }

    public function post(string $path, $handler, array $middlewares = []): void {
        $this->addRoute('POST', $path, $handler, $middlewares);
    }

    public function put(string $path, $handler, array $middlewares = []): void {
        $this->addRoute('PUT', $path, $handler, $middlewares);
    }

    public function delete(string $path, $handler, array $middlewares = []): void {
        $this->addRoute('DELETE', $path, $handler, $middlewares);
    }

    public function patch(string $path, $handler, array $middlewares = []): void {
        $this->addRoute('PATCH', $path, $handler, $middlewares);
    }

    public function options(string $path, $handler): void {
        $this->addRoute('OPTIONS', $path, $handler, []);
    }

    private function addRoute(string $method, string $path, $handler, array $middlewares): void {
        $fullPath = rtrim($this->groupPrefix . $path, '/');
        if (empty($fullPath)) $fullPath = '/';

        $this->routes[] = [
            'method'      => $method,
            'path'        => $fullPath,
            'handler'     => $handler,
            'middlewares' => array_merge($this->groupMiddlewares, $middlewares)
        ];
    }

    public function dispatch(Request $request): void {
        $requestMethod = $request->getMethod();
        $requestUri = rtrim($request->getUri(), '/');
        if (empty($requestUri)) $requestUri = '/';

        // Preflight CORS handler
        if ($requestMethod === 'OPTIONS') {
            Response::json(['status' => 'ok'], 200, [
                'Access-Control-Allow-Origin'  => '*',
                'Access-Control-Allow-Methods' => 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
                'Access-Control-Allow-Headers' => 'Content-Type, Authorization, X-Tenant-ID, X-Tenant-Subdomain, X-Requested-With, Accept',
                'Access-Control-Allow-Credentials' => 'true'
            ]);
            return;
        }

        foreach ($this->routes as $route) {
            if ($route['method'] !== $requestMethod) {
                continue;
            }

            $pattern = preg_replace('/\{([a-zA-Z0-9_]+)\}/', '(?P<$1>[^/]+)', $route['path']);
            $pattern = "#^" . $pattern . "$#";

            if (preg_match($pattern, $requestUri, $matches)) {
                $params = array_filter($matches, 'is_string', ARRAY_FILTER_USE_KEY);
                
                // Execute Middleware Pipeline
                foreach ($route['middlewares'] as $middleware) {
                    $mwInstance = is_string($middleware) ? new $middleware() : $middleware;
                    $response = $mwInstance->handle($request);
                    if ($response !== null) {
                        return;
                    }
                }

                // Execute Controller
                $handler = $route['handler'];
                if (is_array($handler) && count($handler) === 2) {
                    [$class, $method] = $handler;
                    $controller = new $class();
                    $controller->$method($request, $params);
                    return;
                } elseif (is_callable($handler)) {
                    call_user_func($handler, $request, $params);
                    return;
                }
            }
        }

        Response::error("Route '{$requestMethod} {$requestUri}' not found", 404);
    }
}
