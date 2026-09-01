<?php

namespace EduManage\Services;

class BangladeshGradingEngine {
    /**
     * Standard Bangladesh NCTB / Education Board Grading Scale
     */
    public static function getGradeFromMarks(float $marks, float $fullMarks = 100.00): array {
        // Normalize to percentage
        $percentage = ($marks / ($fullMarks ?: 100)) * 100;

        if ($percentage >= 80.00) {
            return ['grade' => 'A+', 'point' => 5.00, 'remarks' => 'Outstanding'];
        } elseif ($percentage >= 70.00) {
            return ['grade' => 'A',  'point' => 4.00, 'remarks' => 'Excellent'];
        } elseif ($percentage >= 60.00) {
            return ['grade' => 'A-', 'point' => 3.50, 'remarks' => 'Very Good'];
        } elseif ($percentage >= 50.00) {
            return ['grade' => 'B',  'point' => 3.00, 'remarks' => 'Good'];
        } elseif ($percentage >= 40.00) {
            return ['grade' => 'C',  'point' => 2.00, 'remarks' => 'Satisfactory'];
        } elseif ($percentage >= 33.00) {
            return ['grade' => 'D',  'point' => 1.00, 'remarks' => 'Passing'];
        } else {
            return ['grade' => 'F',  'point' => 0.00, 'remarks' => 'Failed'];
        }
    }

    /**
     * Compute Final Student Result with NCTB 4th Subject Bonus Rule
     *
     * In Bangladesh Board exams:
     * - Total Compulsory Subjects (e.g. 6 subjects: Bangla, English, Math, Physics, Chem, Bio)
     * - 4th Subject (e.g. Higher Math or Agriculture): Points above 2.00 (i.e. GradePoint - 2.00) are added as bonus.
     * - If student fails (F) in any compulsory subject, Overall GPA is 0.00 (F).
     * - Final GPA = min(5.00, (Sum(Compulsory Points) + Bonus Points) / Count(Compulsory Subjects))
     */
    public static function calculateFinalGPA(array $subjectResults): array {
        $compulsoryPointsSum = 0.00;
        $compulsoryCount = 0;
        $fourthSubjectBonus = 0.00;
        $hasFailedSubject = false;
        $totalMarksObtained = 0.00;
        $totalFullMarks = 0.00;

        $detailedResults = [];

        foreach ($subjectResults as $sub) {
            $is4th = !empty($sub['is_4th_subject']) || ($sub['type'] ?? '') === 'elective_4th';
            $cq = floatval($sub['cq_marks'] ?? 0);
            $mcq = floatval($sub['mcq_marks'] ?? 0);
            $pr = floatval($sub['practical_marks'] ?? 0);
            $ca = floatval($sub['ca_marks'] ?? 0);
            $total = $cq + $mcq + $pr + $ca;
            $fullMarks = floatval($sub['full_marks'] ?? 100);

            $gradeInfo = self::getGradeFromMarks($total, $fullMarks);
            $totalMarksObtained += $total;
            $totalFullMarks += $fullMarks;

            if ($is4th) {
                // 4th subject rule: points above 2.00 are bonus
                if ($gradeInfo['point'] > 2.00) {
                    $fourthSubjectBonus = $gradeInfo['point'] - 2.00;
                }
            } else {
                $compulsoryPointsSum += $gradeInfo['point'];
                $compulsoryCount++;

                if ($gradeInfo['grade'] === 'F') {
                    $hasFailedSubject = true;
                }
            }

            $detailedResults[] = [
                'subject_id'   => $sub['subject_id'] ?? null,
                'subject_name' => $sub['name'] ?? $sub['subject_name'] ?? 'Subject',
                'subject_code' => $sub['code'] ?? '',
                'is_4th'       => $is4th,
                'cq'           => $cq,
                'mcq'          => $mcq,
                'practical'    => $pr,
                'ca'           => $ca,
                'total'        => $total,
                'full_marks'   => $fullMarks,
                'grade'        => $gradeInfo['grade'],
                'point'        => $gradeInfo['point']
            ];
        }

        if ($hasFailedSubject || $compulsoryCount === 0) {
            $finalGPA = 0.00;
            $finalGrade = 'F';
            $status = 'FAILED';
        } else {
            $rawGPA = ($compulsoryPointsSum + $fourthSubjectBonus) / $compulsoryCount;
            $finalGPA = min(5.00, round($rawGPA, 2));

            if ($finalGPA >= 5.00) $finalGrade = 'A+';
            elseif ($finalGPA >= 4.00) $finalGrade = 'A';
            elseif ($finalGPA >= 3.50) $finalGrade = 'A-';
            elseif ($finalGPA >= 3.00) $finalGrade = 'B';
            elseif ($finalGPA >= 2.00) $finalGrade = 'C';
            elseif ($finalGPA >= 1.00) $finalGrade = 'D';
            else $finalGrade = 'F';

            $status = 'PASSED';
        }

        return [
            'total_marks_obtained' => $totalMarksObtained,
            'total_full_marks'     => $totalFullMarks,
            'compulsory_subjects'  => $compulsoryCount,
            'fourth_subject_bonus' => $fourthSubjectBonus,
            'gpa'                  => number_format($finalGPA, 2),
            'letter_grade'         => $finalGrade,
            'status'               => $status,
            'subjects'             => $detailedResults
        ];
    }
}
