<?php

namespace EduManage\Controllers;

use EduManage\Core\Request;
use EduManage\Core\Response;

class RoutineController {
    public function getWeeklyRoutine(Request $request): void {
        $classId = $request->getQuery('class_id', 5);
        $sectionId = $request->getQuery('section_id', 1);

        $days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
        
        $routine = [
            'Saturday' => [
                ['period' => 1, 'time' => '07:30 - 08:15', 'subject' => 'Bangla 1st Paper', 'teacher' => 'Nusrat Jahan', 'room' => '301'],
                ['period' => 2, 'time' => '08:15 - 09:00', 'subject' => 'General Math', 'teacher' => 'Mohammad Rafiqul Islam', 'room' => '301'],
                ['period' => 3, 'time' => '09:00 - 09:45', 'subject' => 'Physics', 'teacher' => 'Dr. Faruq Ahmed', 'room' => 'Lab 1'],
                ['period' => 4, 'time' => '10:00 - 10:45', 'subject' => 'Chemistry', 'teacher' => 'Md. Anwar Hossain', 'room' => 'Lab 2'],
                ['period' => 5, 'time' => '10:45 - 11:30', 'subject' => 'English 1st', 'teacher' => 'Sultana Razia', 'room' => '301']
            ],
            'Sunday' => [
                ['period' => 1, 'time' => '07:30 - 08:15', 'subject' => 'Higher Math', 'teacher' => 'Mohammad Rafiqul Islam', 'room' => '301'],
                ['period' => 2, 'time' => '08:15 - 09:00', 'subject' => 'Biology', 'teacher' => 'Nazmul Huda', 'room' => 'Lab 3'],
                ['period' => 3, 'time' => '09:00 - 09:45', 'subject' => 'Bangla 2nd', 'teacher' => 'Nusrat Jahan', 'room' => '301'],
                ['period' => 4, 'time' => '10:00 - 10:45', 'subject' => 'ICT', 'teacher' => 'Tariqul Islam', 'room' => 'Comp Lab'],
                ['period' => 5, 'time' => '10:45 - 11:30', 'subject' => 'English 2nd', 'teacher' => 'Sultana Razia', 'room' => '301']
            ],
            'Monday' => [
                ['period' => 1, 'time' => '07:30 - 08:15', 'subject' => 'Physics Lab', 'teacher' => 'Dr. Faruq Ahmed', 'room' => 'Lab 1'],
                ['period' => 2, 'time' => '08:15 - 09:00', 'subject' => 'General Math', 'teacher' => 'Mohammad Rafiqul Islam', 'room' => '301'],
                ['period' => 3, 'time' => '09:00 - 09:45', 'subject' => 'Chemistry', 'teacher' => 'Md. Anwar Hossain', 'room' => '301'],
                ['period' => 4, 'time' => '10:00 - 10:45', 'subject' => 'Religion', 'teacher' => 'Mawlana Abdul Matin', 'room' => '301'],
                ['period' => 5, 'time' => '10:45 - 11:30', 'subject' => 'Bangla 1st', 'teacher' => 'Nusrat Jahan', 'room' => '301']
            ],
            'Tuesday' => [
                ['period' => 1, 'time' => '07:30 - 08:15', 'subject' => 'Higher Math', 'teacher' => 'Mohammad Rafiqul Islam', 'room' => '301'],
                ['period' => 2, 'time' => '08:15 - 09:00', 'subject' => 'Biology Lab', 'teacher' => 'Nazmul Huda', 'room' => 'Lab 3'],
                ['period' => 3, 'time' => '09:00 - 09:45', 'subject' => 'English 1st', 'teacher' => 'Sultana Razia', 'room' => '301'],
                ['period' => 4, 'time' => '10:00 - 10:45', 'subject' => 'BGS (বাংলাদেশ ও বিশ্বপরিচয়)', 'teacher' => 'Kabir Uddin', 'room' => '301'],
                ['period' => 5, 'time' => '10:45 - 11:30', 'subject' => 'ICT Practical', 'teacher' => 'Tariqul Islam', 'room' => 'Comp Lab']
            ],
            'Wednesday' => [
                ['period' => 1, 'time' => '07:30 - 08:15', 'subject' => 'General Math', 'teacher' => 'Mohammad Rafiqul Islam', 'room' => '301'],
                ['period' => 2, 'time' => '08:15 - 09:00', 'subject' => 'Physics', 'teacher' => 'Dr. Faruq Ahmed', 'room' => '301'],
                ['period' => 3, 'time' => '09:00 - 09:45', 'subject' => 'Chemistry Lab', 'teacher' => 'Md. Anwar Hossain', 'room' => 'Lab 2'],
                ['period' => 4, 'time' => '10:00 - 10:45', 'subject' => 'English 2nd', 'teacher' => 'Sultana Razia', 'room' => '301'],
                ['period' => 5, 'time' => '10:45 - 11:30', 'subject' => 'Physical Education', 'teacher' => 'Zillur Rahman', 'room' => 'Ground']
            ],
            'Thursday' => [
                ['period' => 1, 'time' => '07:30 - 08:15', 'subject' => 'Higher Math', 'teacher' => 'Mohammad Rafiqul Islam', 'room' => '301'],
                ['period' => 2, 'time' => '08:15 - 09:00', 'subject' => 'Biology', 'teacher' => 'Nazmul Huda', 'room' => '301'],
                ['period' => 3, 'time' => '09:00 - 09:45', 'subject' => 'Bangla 2nd', 'teacher' => 'Nusrat Jahan', 'room' => '301'],
                ['period' => 4, 'time' => '10:00 - 10:45', 'subject' => 'Weekly Revision & Quiz', 'teacher' => 'Class Teacher', 'room' => '301']
            ]
        ];

        Response::success([
            'class' => 'Class 10 (Science)',
            'section' => 'Padma (Morning Shift)',
            'routine' => $routine
        ], 'Weekly routine fetched');
    }
}
