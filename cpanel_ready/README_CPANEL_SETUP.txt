================================================================================
MANESCHOOL.SITE.JE - CPANEL & INFINITYFREE DEPLOYMENT GUIDE
Multi-Tenant Bangladeshi School & College Management SaaS
================================================================================

YOUR HOSTING CREDENTIALS CONFIGURED:
- Website Domain: http://maneschool.site.je / https://maneschool.site.je
- MySQL Host:     sql101.infinityfree.com
- MySQL Database: if0_42784359_myscmanagement
- MySQL Username: if0_42784359
- MySQL Password: 4naAUPQvgRj3

--------------------------------------------------------------------------------
STEP 1: IMPORT DATABASE IN PHPMYADMIN (১ম ধাপ: ডাটাবেস ইম্পোর্ট)
--------------------------------------------------------------------------------
1. Log in to your InfinityFree / cPanel Control Panel.
2. Click on "phpMyAdmin" or open the database "if0_42784359_myscmanagement".
3. Click on the database name: if0_42784359_myscmanagement (left sidebar).
4. Click on the "Import" tab at the top menu.
5. Click "Choose File" / "Browse" and select the file:
   import_to_phpmyadmin.sql (located in this folder)
6. Scroll to the bottom and click "Import" / "Go".
   => All 13 tables, grading scales, and initial school records will be created!

--------------------------------------------------------------------------------
STEP 2: UPLOAD WEBSITE FILES TO HTDOCS (২য় ধাপ: ফাইল আপলোড)
--------------------------------------------------------------------------------
1. In cPanel / InfinityFree, open "Online File Manager" (or connect via FTP / FileZilla).
2. Go to your domain folder: /htdocs/ (or /maneschool.site.je/htdocs/).
3. Delete or overwrite any default "index2.html" or "default.php" file.
4. Upload all the files and folders from the "cpanel_ready" directory into your "htdocs" directory:
   - index.html
   - .htaccess
   - api/ (directory containing index.php)
   - config/ (directory containing database.php & app.php)
   - src/ (directory containing Core, Services, Controllers, Middleware)

--------------------------------------------------------------------------------
STEP 3: VISIT YOUR LIVE WEBSITE (৩য় ধাপ: সাইট ভিজিট করুন)
--------------------------------------------------------------------------------
Open your browser and visit:
http://maneschool.site.je

Everything is live, including:
- Mane School and College Dashboard
- Student Admission & Dual-Sided ID Card Generator
- Daily Class Attendance & Absent SMS Alert Trigger
- Bangladesh NCTB GPA 5.0 Tabulation Sheet & Exam Admit Cards
- Fee Collection POS Counter (bKash/Nagad/Cash) & 3-Part Money Receipts
- Weekly Class Routine Matrix (Saturday-Thursday)
- Bulk SMS Broadcast Portal with Bengali Unicode counter
- Faculty Payroll & Salary Slips
================================================================================
