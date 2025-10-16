-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 16, 2025 at 01:25 PM
-- Server version: 5.7.14-log
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `booking`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `temple_id` int(11) DEFAULT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('super_admin','admin','user') DEFAULT 'admin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `temple_id`, `phone`, `email`, `password`, `role`) VALUES
(1, 'shreedhar pawar', 1, '9071177157', 'shreedhar@codemythought.com', '$2b$10$Rv5L8TUiKosXejYKqG3UE.9KirxGdGHJIbdKRDNpepz/lqhJr0RdS', 'super_admin'),
(32, 'Deepak', 33, '1234567890', 'deepak@gmail.com', '$2b$10$Rv5L8TUiKosXejYKqG3UE.9KirxGdGHJIbdKRDNpepz/lqhJr0RdS', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `admin_login_history`
--

CREATE TABLE `admin_login_history` (
  `id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `login_time` datetime NOT NULL,
  `logout_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `deities`
--

CREATE TABLE `deities` (
  `id` int(11) NOT NULL,
  `temple_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `deities`
--

INSERT INTO `deities` (`id`, `temple_id`, `name`) VALUES
(1, 28, 'Lord Sri Ganesha'),
(4, 28, 'qwdwdqwd'),
(5, 28, '	Lord Sri Shiva'),
(6, 28, 'Sri Parvathi Devi'),
(7, 28, 'Navagraha Shanthi'),
(8, 28, 'Sri Sathyanarayana');

-- --------------------------------------------------------

--
-- Table structure for table `devotees`
--

CREATE TABLE `devotees` (
  `id` int(11) NOT NULL,
  `temple_id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `gothra` varchar(100) DEFAULT NULL,
  `nakshatra` varchar(100) DEFAULT NULL,
  `rashi` varchar(100) DEFAULT NULL,
  `date_of_birth` varchar(255) DEFAULT NULL,
  `date_of_marriage` varchar(255) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `mobile_alternate` varchar(15) DEFAULT NULL,
  `address1` varchar(255) DEFAULT NULL,
  `address2` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `pincode` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `devotees`
--

INSERT INTO `devotees` (`id`, `temple_id`, `first_name`, `last_name`, `gothra`, `nakshatra`, `rashi`, `date_of_birth`, `date_of_marriage`, `email`, `mobile`, `mobile_alternate`, `address1`, `address2`, `city`, `state`, `country`, `pincode`) VALUES
(1, 0, 'Shreedhar', 'Pawar', 'Bharadwaj', 'Ashwini', 'Aries', '1985-06-15', '2010-05-20', 'shreedhar1@example.com', '9876543210', '9876543211', '123 Main St', 'Apt 1', 'Bidar', 'Karnataka', 'India', '585401'),
(2, 0, 'Krishna', 'Kumar', 'Vasistha', 'Bharani', 'Taurus', '1990-08-12', '2015-12-10', 'krishna1@example.com', '9876543212', '9876543213', '456 Market Rd', '', 'Bangalore', 'Karnataka', 'India', '560001'),
(3, 0, 'Radha', 'Sharma', 'Agastya', 'Krittika', 'Gemini', '1988-03-25', '2012-07-18', 'radha1@example.com', '9876543214', '9876543215', '789 Park Lane', '', 'Mysore', 'Karnataka', 'India', '570001'),
(4, 0, 'Ramesh', 'Patil', 'Vashishtha', 'Rohini', 'Cancer', '1982-11-05', '2008-11-11', 'ramesh1@example.com', '9876543216', '9876543217', '12 Sunrise Blvd', '', 'Hubli', 'Karnataka', 'India', '580020'),
(5, 0, 'Sita', 'Desai', 'Bharadwaj', 'Mrigashira', 'Leo', '1995-01-15', '2020-03-10', 'sita1@example.com', '9876543218', '9876543219', '34 Moonlight Ave', '', 'Belgaum', 'Karnataka', 'India', '590001'),
(6, 0, 'Vikram', 'Rao', 'Agastya', 'Ardra', 'Virgo', '1987-09-10', '2013-06-20', 'vikram1@example.com', '9876543220', '9876543221', '56 Lotus St', '', 'Gulbarga', 'Karnataka', 'India', '585101'),
(7, 0, 'Anita', 'Singh', 'Vashishtha', 'Punarvasu', 'Libra', '1992-02-28', '2016-10-05', 'anita1@example.com', '9876543222', '9876543223', '78 Rose Rd', '', 'Mangalore', 'Karnataka', 'India', '575001'),
(8, 0, 'Rajesh', 'Naik', 'Bharadwaj', 'Pushya', 'Scorpio', '1980-07-18', '2005-12-30', 'rajesh1@example.com', '9876543224', '9876543225', '90 Palm St', '', 'Shimoga', 'Karnataka', 'India', '577201'),
(9, 0, 'Priya', 'Kamat', 'Agastya', 'Ashlesha', 'Sagittarius', '1993-05-12', '2018-04-15', 'priya1@example.com', '9876543226', '9876543227', '11 Tulip Rd', '', 'Davangere', 'Karnataka', 'India', '577001'),
(10, 0, 'Suresh', 'Shetty', 'Vashishtha', 'Magha', 'Capricorn', '1985-08-22', '2010-11-10', 'suresh1@example.com', '9876543228', '9876543229', '22 Orchid Lane', '', 'Udupi', 'Karnataka', 'India', '576101'),
(11, 0, 'Meena', 'Gowda', 'Bharadwaj', 'Purva Phalguni', 'Aquarius', '1989-04-05', '2014-09-20', 'meena1@example.com', '9876543230', '9876543231', '33 Jasmine St', '', 'Bagalkot', 'Karnataka', 'India', '587101'),
(12, 0, 'Ajay', 'Kulkarni', 'Agastya', 'Uttara Phalguni', 'Pisces', '1991-12-30', '2017-03-12', 'ajay1@example.com', '9876543232', '9876543233', '44 Maple Rd', '', 'Bellary', 'Karnataka', 'India', '583101'),
(13, 0, 'Lakshmi', 'Reddy', 'Vashishtha', 'Hasta', 'Aries', '1986-06-15', '2011-08-05', 'lakshmi1@example.com', '9876543234', '9876543235', '55 Lotus St', '', 'Bijapur', 'Karnataka', 'India', '586101'),
(14, 0, 'Naveen', 'Patil', 'Bharadwaj', 'Chitra', 'Taurus', '1994-10-10', '2019-01-01', 'naveen1@example.com', '9876543236', '9876543237', '66 Sunflower Rd', '', 'Raichur', 'Karnataka', 'India', '584101'),
(15, 0, 'Deepa', 'Naik', 'Agastya', 'Swati', 'Gemini', '1988-09-20', '2013-07-10', 'deepa1@example.com', '9876543238', '9876543239', '77 Orchid Lane', '', 'Chitradurga', 'Karnataka', 'India', '577501'),
(16, 0, 'Vivek', 'Shetty', 'Vashishtha', 'Vishakha', 'Cancer', '1983-03-12', '2009-05-25', 'vivek1@example.com', '9876543240', '9876543241', '88 Tulip Rd', '', 'Hassan', 'Karnataka', 'India', '573201'),
(17, 0, 'Sonal', 'Desai', 'Bharadwaj', 'Anuradha', 'Leo', '1996-11-15', '2021-02-12', 'sonal1@example.com', '9876543242', '9876543243', '99 Jasmine St', '', 'Kodagu', 'Karnataka', 'India', '571201'),
(18, 0, 'Rohan', 'Rao', 'Agastya', 'Jyeshtha', 'Virgo', '1990-07-05', '2015-06-18', 'rohan1@example.com', '9876543244', '9876543245', '100 Maple Rd', '', 'Karwar', 'Karnataka', 'India', '581301'),
(19, 0, 'Anjali', 'Kamat', 'Vashishtha', 'Mula', 'Libra', '1987-02-28', '2012-09-25', 'anjali1@example.com', '9876543246', '9876543247', '111 Palm St', '', 'Sirsi', 'Karnataka', 'India', '581401'),
(20, 0, 'Kiran', 'Sharma', 'Bharadwaj', 'Purva Ashadha', 'Scorpio', '1992-05-15', '2016-08-10', 'kiran1@example.com', '9876543248', '9876543249', '122 Sunrise Blvd', '', 'Haveri', 'Karnataka', 'India', '581101'),
(21, 33, 's', 's', 'w', 'w', 'w', '2025-10-17', '', 'deepak@gmail.com', '09844078859', '', 'nvhgffv', 'bidar', 'Bengaluru', 'Karnataka', 'India', '560060');

-- --------------------------------------------------------

--
-- Table structure for table `donations`
--

CREATE TABLE `donations` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `temple_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_method` enum('cash','card','upi','bank') DEFAULT 'cash',
  `transaction_id` varchar(255) DEFAULT NULL,
  `donation_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `remarks` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `donations`
--

INSERT INTO `donations` (`id`, `user_id`, `temple_id`, `amount`, `payment_method`, `transaction_id`, `donation_date`, `remarks`) VALUES
(4, 1, 28, 12.00, 'cash', NULL, '2025-10-04 11:24:04', 'helo'),
(5, 1, 28, 21.00, 'card', NULL, '2025-10-04 11:25:27', 'd'),
(6, 1, 28, 12.00, 'card', NULL, '2025-10-04 11:26:56', 'd');

-- --------------------------------------------------------

--
-- Table structure for table `donationtype`
--

CREATE TABLE `donationtype` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `temple_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `donationtype`
--

INSERT INTO `donationtype` (`id`, `name`, `amount`, `temple_id`) VALUES
(1, 'Temple Donation', 1211.00, 28),
(2, 'Medical Fund', 500.00, 28),
(3, 'Educational Fund', 750.00, 28),
(4, 'Shaswatha Pooja Donation', 300.00, 28),
(5, 'Prasadam Items', 450.00, 28),
(6, 'Contribution towards Coconut', 100.00, 28),
(7, 'Contribution towards Yoga Classes', 200.00, 28),
(8, 'Contribution towards use of Yaga Mantapa', 600.00, 28),
(9, 'Contribution towards use of Shanti Mandira', 400.00, 28),
(10, 'General Contibution to Temple', 1000.00, 28),
(11, 'Annadhana Scheme', 350.00, 28),
(12, 'Vastra Seva', 250.00, 28),
(13, 'Building Fund for Ganesh Mahal', 1500.00, 28),
(14, 'Donation in Kind Gold, Silver, Brass Etc...', 2000.00, 28),
(15, 'Special Pooja Donations', 700.00, 28),
(16, 'Flower Offerings', 300.00, 28),
(17, 'Festival Decoration Fund', 450.00, 28),
(18, 'Lighting & Electricity Fund', 600.00, 28),
(19, 'Temple Maintenance', 1200.00, 28),
(20, 'Charity Fund', 800.00, 28),
(21, 'Anniversary Celebration', 500.00, 28),
(22, 'Temple Library Donations', 350.00, 28),
(23, 'Cultural Events Fund', 400.00, 28),
(24, 'Sound System Fund', 700.00, 28),
(25, 'Miscellaneous Donations', 250.00, 28),
(26, 'Donation for Lighting', 300.00, 28),
(27, 'Garden & Landscaping Fund', 600.00, 28),
(28, 'Temple Renovation', 1500.00, 28),
(29, 'Special Offerings', 200.00, 28),
(30, 'Community Kitchen Fund', 800.00, 28),
(31, 'Temple Security Fund', 400.00, 28),
(32, 'Festive Fireworks Fund', 350.00, 28),
(33, 'Temple Transport Donation', 500.00, 28),
(34, 'Audio Visual Fund', 450.00, 28),
(35, 'Temple Publications Fund', 300.00, 28),
(36, 'Education Support Fund', 700.00, 28),
(37, 'Medical Assistance Fund', 650.00, 28),
(38, 'Emergency Relief Fund', 900.00, 28),
(39, 'Pilgrim Accommodation Fund', 800.00, 28),
(40, 'Water Supply Fund', 400.00, 28),
(41, 'Temple Decorations', 250.00, 28),
(42, 'Youth Activities Fund', 350.00, 28),
(43, 'Women Empowerment Fund', 500.00, 28),
(44, 'Cultural Preservation Fund', 600.00, 28),
(45, 'Community Outreach Fund', 700.00, 28),
(46, 'Temple Library Expansion', 450.00, 28),
(47, 'Technology & IT Fund', 500.00, 28),
(48, 'Temple Maintenance Equipment', 600.00, 28),
(49, 'Miscellaneous Temple Expenses', 300.00, 28),
(50, 'Annual General Fund', 1000.00, 28);

-- --------------------------------------------------------

--
-- Table structure for table `gothra`
--

CREATE TABLE `gothra` (
  `id` int(11) NOT NULL,
  `gothras` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `gothra`
--

INSERT INTO `gothra` (`id`, `gothras`) VALUES
(1, 'Bharadwaj'),
(2, 'Kashyap'),
(3, 'Vashishtha'),
(4, 'Vishwamitra'),
(5, 'Gautam'),
(6, 'Atri'),
(7, 'Agastya'),
(8, 'Jamadagni'),
(9, 'Kaushik'),
(10, 'Shandilya');

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `sms` varchar(255) NOT NULL,
  `email_subject` varchar(255) NOT NULL,
  `email_message` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id`, `title`, `sms`, `email_subject`, `email_message`) VALUES
(1, 'User Registration', 'Dear Devotee, Thank you for registering with {{orgshort}}', '{{orgshort}} - Thank you for registering', 'Dear {{fullname}},\n\nThank you for registering with us. The following are the contact details we have received for your registration;\nName: {{fullname}}\nMobile Number: {{mobile}}\n\nBest Wishes,\n{{org}}'),
(2, 'Donation Received', 'Dear {{fullname}}, we have received your donation of ₹{{amount}}. Thank you for supporting {{orgshort}}.', '{{orgshort}} - Donation Confirmation', 'Dear {{fullname}},<br><br>We have gratefully received your generous donation of ₹{{amount}}.<br>Thank you for supporting {{orgname}}.<br><br>Sincerely,<br>{{orgshort}}');

-- --------------------------------------------------------

--
-- Table structure for table `modules`
--

CREATE TABLE `modules` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `modules`
--

INSERT INTO `modules` (`id`, `name`, `category`) VALUES
(4, 'user', 'User Management'),
(5, 'temple', 'Temple Management'),
(6, 'deity', 'Deity Management'),
(7, 'seva', 'Seva Management'),
(8, 'seva_booking', 'Seva Booking Management'),
(9, 'donation', 'Donation Management'),
(10, 'devotee', 'Devotee Profiles'),
(11, 'nakshatra', 'Nakshatra Information'),
(12, 'rashi', 'Rashi Information'),
(13, 'gothra', 'Gothra Information'),
(14, 'payment', 'Payment Processing'),
(15, 'notification', 'Notifications & Alerts'),
(16, 'report', 'Reports & Analytics'),
(17, 'role', 'Roles & Permissions'),
(18, 'staff', 'Staff Management'),
(19, 'event', 'Temple Events'),
(20, 'feedback', 'Feedback & Ratings'),
(21, 'gallery', 'Media & Gallery'),
(22, 'faq', 'Frequently Asked Questions'),
(23, 'settings', 'System Settings'),
(24, 'login', 'login');

-- --------------------------------------------------------

--
-- Table structure for table `nakshatra`
--

CREATE TABLE `nakshatra` (
  `id` int(11) NOT NULL,
  `nakshatras` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `nakshatra`
--

INSERT INTO `nakshatra` (`id`, `nakshatras`) VALUES
(1, 'Ashwini'),
(2, 'Bharani'),
(3, 'Krittika'),
(4, 'Rohini'),
(5, 'Mrigashira'),
(6, 'Ardra'),
(7, 'Punarvasu'),
(8, 'Pushya'),
(9, 'Ashlesha'),
(10, 'Magha'),
(11, 'Purva Phalguni'),
(12, 'Uttara Phalguni'),
(13, 'Hasta'),
(14, 'Chitra'),
(15, 'Swati'),
(16, 'Vishakha'),
(17, 'Anuradha'),
(18, 'Jyeshtha'),
(19, 'Mula'),
(20, 'Purva Ashadha'),
(21, 'Uttara Ashadha'),
(22, 'Shravana'),
(23, 'Dhanishta'),
(24, 'Shatabhisha'),
(25, 'Purva Bhadrapada'),
(26, 'Uttara Bhadrapada'),
(27, 'Revati'),
(28, 'Abhijit');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `admin_id` int(11) NOT NULL,
  `otp` varchar(10) DEFAULT NULL,
  `expires_at` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `rashi`
--

CREATE TABLE `rashi` (
  `id` int(11) NOT NULL,
  `name_sanskrit` varchar(255) NOT NULL,
  `name_english` varchar(255) NOT NULL,
  `symbol` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `rashi`
--

INSERT INTO `rashi` (`id`, `name_sanskrit`, `name_english`, `symbol`) VALUES
(1, 'Mesha', 'Aries', '♈'),
(2, 'Vrishabha', 'Taurus', '♉'),
(3, 'Mithuna', 'Gemini', '♊'),
(4, 'Karka', 'Cancer', '♋'),
(5, 'Simha', 'Leo', '♌'),
(6, 'Kanya', 'Virgo', '♍'),
(7, 'Tula', 'Libra', '♎'),
(8, 'Vrischika', 'Scorpio', '♏'),
(9, 'Dhanu', 'Sagittarius', '♐'),
(10, 'Makara', 'Capricorn', '♑'),
(11, 'Kumbha', 'Aquarius', '♒'),
(12, 'Meena', 'Pisces', '♓');

-- --------------------------------------------------------

--
-- Table structure for table `seva`
--

CREATE TABLE `seva` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text,
  `amount` decimal(11,2) NOT NULL,
  `maxlimit` int(11) NOT NULL,
  `seats` tinyint(4) NOT NULL,
  `temple_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `seva`
--

INSERT INTO `seva` (`id`, `name`, `description`, `amount`, `maxlimit`, `seats`, `temple_id`) VALUES
(1, 'Other', NULL, 0.00, 100, 100, 28),
(2, 'Astothara / Archana', NULL, 10.00, 100, 100, 28),
(3, 'Bilwarchane', NULL, 10.00, 100, 100, 28),
(4, 'Rudrabhisheka 7am', '', 350.00, 100, 100, 33),
(5, 'Panchamrutha Abhisheka Lord Shiva 7AM', NULL, 300.00, 100, 100, 28),
(6, 'Panchamrutha Abhisheka Goddess Parvathi 7AM', NULL, 300.00, 100, 100, 28),
(7, 'Panchamrutha Abhisheka Lord Subramanya 7AM', NULL, 300.00, 100, 100, 28),
(8, 'Panchamrutha Abhisheka Ganapathi 7AM', NULL, 300.00, 100, 100, 28),
(9, 'Panchamrutha Abhisheka Lord Shiva Fest Spl', NULL, 350.00, 100, 100, 28),
(10, 'Panchamrutha Abhisheka Parvathi Fest Spl', '', 350.00, 10, 100, 33),
(11, 'Panchamrutha Abhisheka Subramanya Fest Spl', NULL, 350.00, 100, 100, 28),
(12, 'Panchamrutha Abhisheka Ganapathi Fest Spl', NULL, 350.00, 100, 100, 28),
(13, 'Navagraha Shanthi 7 AM', NULL, 350.00, 100, 100, 28),
(14, 'Rice Packet Min', NULL, 25.00, 100, 100, 28),
(15, 'Prasada Seva Sweet Per Time', NULL, 1800.00, 100, 100, 28),
(16, 'Prasada Seva Kara Per time morning', NULL, 1500.00, 100, 100, 28),
(17, 'Prasada Seva Kara Per time- evening', NULL, 1500.00, 100, 100, 28),
(18, 'Sarpasooktha Homa Seva', NULL, 300.00, 100, 100, 28),
(19, 'Sahasramodaka Ganapathi Homa', NULL, 300.00, 100, 100, 28),
(20, 'Group Decoration Each Day For Parvathi Devi', NULL, 150.00, 100, 100, 28),
(24, 'test seva', 'test seva', 12.00, 12, 12, 33);

-- --------------------------------------------------------

--
-- Table structure for table `sevabookings`
--

CREATE TABLE `sevabookings` (
  `id` int(11) NOT NULL,
  `temple_id` int(11) NOT NULL,
  `deity_name` varchar(255) DEFAULT NULL,
  `seva_name` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `gothra` varchar(255) DEFAULT NULL,
  `nakshatra` varchar(255) DEFAULT NULL,
  `rashi` varchar(255) DEFAULT NULL,
  `occasion` varchar(255) DEFAULT NULL,
  `devotee_name` varchar(255) DEFAULT NULL,
  `seva_date` varchar(255) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT '0.00',
  `staff_id` int(11) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `remarks` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sevabookings`
--

INSERT INTO `sevabookings` (`id`, `temple_id`, `deity_name`, `seva_name`, `name`, `gothra`, `nakshatra`, `rashi`, `occasion`, `devotee_name`, `seva_date`, `amount`, `staff_id`, `status`, `remarks`, `created_at`, `timestamp`) VALUES
(1, 28, 'Lord Sri Ganesha', 'Other', '', 'Bharadwaj', 'Ashwini', 'Mesha (Aries)', '', 'Shreedhar Pawar pawar', '2025-10-23', 12.00, 12, 'confirmed', 'wrong data ', '2025-10-04 11:23:21', '2025-10-07 05:12:03'),
(2, 33, 'Lord Sri Ganesha', 'Astothara / Archana', NULL, 'Bharadwaj', 'Ashwini', 'Mesha (Aries)', NULL, 'Shreedhar Pawar', '2025-10-18', 12.00, NULL, 'confirmed', NULL, '2025-10-11 15:43:03', '2025-10-11 10:13:03');

-- --------------------------------------------------------

--
-- Table structure for table `temples`
--

CREATE TABLE `temples` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `temples`
--

INSERT INTO `temples` (`id`, `name`, `location`, `description`, `created_at`) VALUES
(28, 'Krishnas', 'bidar', 'trust temple', '2025-08-22 07:35:28'),
(32, 'Krishna Mandir', 'Bidar', 'Famous Krishna temple', '2025-10-03 12:09:36'),
(33, 'ISKCON Temple', 'Rajaji Nagar', 'Seva Trust temple', '2025-10-03 12:09:36'),
(34, 'Shiva Temple', 'Bangalore', 'Ancient Shiva temple', '2025-10-03 12:09:36'),
(35, 'Venkateswara Temple', 'Tirupati', 'Pilgrimage temple', '2025-10-03 12:09:36'),
(36, 'Meenakshi Temple', 'Madurai', 'Historic Meenakshi temple', '2025-10-03 12:09:36'),
(37, 'Sai Baba Temple', 'Shirdi', 'Sai Baba Samadhi temple', '2025-10-03 12:09:36'),
(38, 'Ranganathaswamy Temple', 'Srirangam', 'Sacred Ranganathaswamy temple', '2025-10-03 12:09:36'),
(39, 'Jagannath Temple', 'Puri', 'Famous Jagannath Rath Yatra', '2025-10-03 12:09:36'),
(40, 'Chamundeshwari Temple', 'Mysore', 'Hill temple dedicated to Chamundi', '2025-10-03 12:09:36'),
(41, 'Kashi Vishwanath Temple', 'Varanasi', 'Lord Shiva temple', '2025-10-03 12:09:36'),
(42, 'Somnath Temple', 'Gujarat', 'Ancient Somnath temple', '2025-10-03 12:09:36'),
(43, 'Murugan Temple', 'Palani', 'Hill temple dedicated to Lord Murugan', '2025-10-03 12:09:36'),
(44, 'Annamalaiyar Temple', 'Tiruvannamalai', 'Historic Shiva temple', '2025-10-03 12:09:36'),
(45, 'Brihadeeswara Temple', 'Thanjavur', 'UNESCO World Heritage site', '2025-10-03 12:09:36'),
(46, 'Kamakhya Temple', 'Guwahati', 'Famous Shakti temple', '2025-10-03 12:09:36'),
(47, 'Golden Temple', 'Amritsar', 'Sikh Gurudwara', '2025-10-03 12:09:36'),
(48, 'Lotus Temple', 'Delhi', 'Baháʼí House of Worship', '2025-10-03 12:09:36'),
(49, 'Konark Sun Temple', 'Konark', 'Sun temple architecture marvel', '2025-10-03 12:09:36'),
(50, 'Virupaksha Temple', 'Hampi', 'Historic Virupaksha temple', '2025-10-03 12:09:36'),
(51, 'Lingaraja Temple', 'Bhubaneswar', 'Famous Lord Shiva temple', '2025-10-03 12:09:36'),
(52, 'Shree Ganesh Mandir', 'Pune', 'Famous Ganesh temple', '2025-10-03 12:43:23'),
(53, 'Shree Krishna Mandir', 'Mumbai', 'Historic Krishna temple', '2025-10-03 12:43:23'),
(54, 'Shree Durga Mandir', 'Ahmedabad', 'Temple dedicated to Goddess Durga', '2025-10-03 12:43:23'),
(55, 'Shree Ram Mandir', 'Varanasi', 'Lord Ram temple', '2025-10-03 12:43:23'),
(56, 'Shree Hanuman Mandir', 'Delhi', 'Ancient Hanuman temple', '2025-10-03 12:43:23'),
(57, 'Shree Sai Baba Mandir', 'Shirdi', 'Sai Baba temple', '2025-10-03 12:43:23'),
(58, 'Shree Venkateshwara Mandir', 'Bengaluru', 'Famous Venkateshwara temple', '2025-10-03 12:43:23'),
(59, 'Shree Jagannath Mandir', 'Puri', 'Temple of Lord Jagannath', '2025-10-03 12:43:23'),
(60, 'Shree Meenakshi Mandir', 'Madurai', 'Historic Meenakshi temple', '2025-10-03 12:43:23'),
(61, 'Shree Laxmi Narayan Mandir', 'Kolkata', 'Popular Narayan temple', '2025-10-03 12:43:23'),
(62, 'Shree Balaji Mandir', 'Tirupati', 'Venkateswara temple', '2025-10-03 12:43:23'),
(63, 'Shree Chamundi Mandir', 'Mysore', 'Hilltop temple', '2025-10-03 12:43:23'),
(64, 'Shree Mahalakshmi Mandir', 'Mumbai', 'Temple dedicated to Mahalakshmi', '2025-10-03 12:43:23'),
(65, 'Shree Ranganatha Mandir', 'Srirangam', 'Ancient Ranganathaswamy temple', '2025-10-03 12:43:23'),
(66, 'Shree Somnath Mandir', 'Gujarat', 'Famous Shiva temple', '2025-10-03 12:43:23'),
(67, 'Shree Murugan Mandir', 'Palani', 'Hill Murugan temple', '2025-10-03 12:43:23'),
(68, 'Shree Brihadeeswara Mandir', 'Thanjavur', 'UNESCO World Heritage site', '2025-10-03 12:43:23'),
(69, 'Shree Kamakhya Mandir', 'Guwahati', 'Shakti temple', '2025-10-03 12:43:23'),
(70, 'Shree Golden Mandir', 'Amritsar', 'Sikh Gurdwara', '2025-10-03 12:43:23'),
(71, 'Shree Lotus Mandir', 'Delhi', 'Baháʼí House of Worship', '2025-10-03 12:43:23'),
(72, 'Shree Konark Mandir', 'Konark', 'Sun temple', '2025-10-03 12:43:23'),
(73, 'Shree Virupaksha Mandir', 'Hampi', 'Historic temple', '2025-10-03 12:43:23'),
(74, 'Shree Lingaraja Mandir', 'Bhubaneswar', 'Lord Shiva temple', '2025-10-03 12:43:23'),
(75, 'Shree Dakshineswar Mandir', 'Kolkata', 'Famous Kali temple', '2025-10-03 12:43:23'),
(76, 'Shree Jambukeshwarar Mandir', 'Tiruchirapalli', 'Shiva temple', '2025-10-03 12:43:23'),
(77, 'Shree Kedareshwar Mandir', 'Uttarakhand', 'Historic temple', '2025-10-03 12:43:23'),
(78, 'Shree Mahabaleshwar Mandir', 'Pune', 'Ancient temple', '2025-10-03 12:43:23'),
(79, 'Shree Omkareshwar Mandir', 'Madhya Pradesh', 'Shiva temple', '2025-10-03 12:43:23'),
(80, 'Shree Trimbakeshwar Mandir', 'Nashik', 'Historic Shiva temple', '2025-10-03 12:43:23'),
(81, 'Shree Kedarnath Mandir', 'Uttarakhand', 'Famous pilgrimage', '2025-10-03 12:43:23'),
(82, 'Shree Badrinath Mandir', 'Uttarakhand', 'Holy Vishnu temple', '2025-10-03 12:43:23'),
(83, 'Shree Hemkund Mandir', 'Uttarakhand', 'Hilltop temple', '2025-10-03 12:43:23'),
(84, 'Shree Vaishno Devi Mandir', 'Jammu', 'Famous Shakti temple', '2025-10-03 12:43:23'),
(85, 'Shree Akshardham Mandir', 'Delhi', 'Modern architectural marvel', '2025-10-03 12:43:23'),
(86, 'Shree Jagatpita Brahma Mandir', 'Pushkar', 'Historic Brahma temple', '2025-10-03 12:43:23'),
(87, 'Shree Raghunath Mandir', 'Jammu', 'Temple dedicated to Lord Rama', '2025-10-03 12:43:23'),
(88, 'Shree Nathdwara Mandir', 'Rajasthan', 'Krishna temple', '2025-10-03 12:43:23'),
(89, 'Shree Dwarkadhish Mandir', 'Dwarka', 'Temple of Lord Krishna', '2025-10-03 12:43:23'),
(90, 'Shree Balaji Mandir', 'Mumbai', 'Popular Balaji temple', '2025-10-03 12:43:23'),
(91, 'Shree Gokarnanatheshwara Mandir', 'Mangalore', 'Historic temple', '2025-10-03 12:43:23'),
(92, 'Shree Udupi Sri Krishna Mandir', 'Udupi', 'Famous Krishna temple', '2025-10-03 12:43:23'),
(93, 'Shree Chamundeswari Mandir', 'Mysore', 'Hill temple', '2025-10-03 12:43:23'),
(94, 'Shree Kapaleeshwarar Mandir', 'Chennai', 'Ancient Shiva temple', '2025-10-03 12:43:23'),
(95, 'Shree Ekambareswarar Mandir', 'Kanchipuram', 'Historic temple', '2025-10-03 12:43:23'),
(96, 'Shree Kanchipuram Varadaraja Mandir', 'Kanchipuram', 'Vaishnavite temple', '2025-10-03 12:43:23'),
(97, 'Shree Annamalai Mandir', 'Tiruvannamalai', 'Shiva temple', '2025-10-03 12:43:23'),
(98, 'Shree Rameshwaram Mandir', 'Rameshwaram', 'Historic pilgrimage', '2025-10-03 12:43:23'),
(99, 'Shree Srikalahasti Mandir', 'Andhra Pradesh', 'Famous Shiva temple', '2025-10-03 12:43:23'),
(100, 'Shree Chidambaram Nataraja Mandir', 'Tamil Nadu', 'Famous dance Shiva temple', '2025-10-03 12:43:23'),
(101, 'Shree Vaitheeswaran Koil', 'Tamil Nadu', 'Temple for healing', '2025-10-03 12:43:23'),
(102, 'Shree Marundeeswarar Mandir', 'Chennai', 'Ancient Shiva temple', '2025-10-03 12:43:23'),
(103, 'Shree Kanchipuram Kailasanathar Mandir', 'Kanchipuram', 'Historic Shiva temple', '2025-10-03 12:43:23'),
(104, 'Shree Kallalagar Mandir', 'Madurai', 'Famous Vishnu temple', '2025-10-03 12:43:23'),
(105, 'Shree Alamelu Mangai Mandir', 'Tirupati', 'Temple of Goddess Alamelu', '2025-10-03 12:43:23'),
(106, 'Shree Thirumala Venkateswara Mandir', 'Tirupati', 'Famous pilgrimage', '2025-10-03 12:43:23'),
(107, 'Shree Sri Ranganathaswamy Mandir', 'Srirangam', 'Sacred Vaishnavite temple', '2025-10-03 12:43:23'),
(108, 'Shree Sri Varadaraja Perumal Mandir', 'Kanchipuram', 'Historic temple', '2025-10-03 12:43:23'),
(109, 'Shree Anantha Padmanabha Mandir', 'Thiruvananthapuram', 'Ancient Vishnu temple', '2025-10-03 12:43:23'),
(110, 'Shree Vadakkunnathan Mandir', 'Thrissur', 'Historic Shiva temple', '2025-10-03 12:43:23'),
(111, 'Shree Guruvayur Temple', 'Kerala', 'Famous Krishna temple', '2025-10-03 12:43:23'),
(112, 'Shree Chottanikkara Mandir', 'Kerala', 'Shakti temple', '2025-10-03 12:43:23'),
(113, 'Shree Padmanabhaswamy Mandir', 'Thiruvananthapuram', 'Famous temple of wealth', '2025-10-03 12:43:23'),
(114, 'Shree Attukal Bhagavathy Mandir', 'Kerala', 'Popular Shakti temple', '2025-10-03 12:43:23'),
(115, 'Shree Parvati Mandir', 'Pune', 'Famous Parvati temple', '2025-10-03 12:43:23'),
(116, 'Shree Bhimashankar Mandir', 'Maharashtra', 'Shiva temple', '2025-10-03 12:43:23'),
(117, 'Shree Trimbakeshwar Mandir', 'Nashik', 'Ancient Shiva temple', '2025-10-03 12:43:23'),
(118, 'Shree Omkareshwar Mandir', 'Madhya Pradesh', 'Sacred pilgrimage', '2025-10-03 12:43:23'),
(119, 'Shree Mahakaleshwar Mandir', 'Ujjain', 'Famous Shiva temple', '2025-10-03 12:43:23'),
(120, 'Shree Kalighat Mandir', 'Kolkata', 'Shakti temple', '2025-10-03 12:43:23'),
(121, 'Shree Dakshineswar Kali Mandir', 'Kolkata', 'Historic temple', '2025-10-03 12:43:23'),
(122, 'Shree Belur Math', 'Kolkata', 'Ramakrishna Math temple', '2025-10-03 12:43:23'),
(123, 'Shree Ramakrishna Mandir', 'Kolkata', 'Famous temple', '2025-10-03 12:43:23'),
(124, 'Shree Jagannath Mandir', 'Bhubaneswar', 'Famous Jagannath temple', '2025-10-03 12:43:23'),
(125, 'Shree Hanuman Mandir', 'Delhi', 'Historic Hanuman temple', '2025-10-03 12:43:23'),
(126, 'Shree Nageshwar Mandir', 'Dwarka', 'Shiva temple', '2025-10-03 12:43:23'),
(127, 'Shree Raghunath Mandir', 'Jammu', 'Famous Rama temple', '2025-10-03 12:43:23'),
(128, 'Shree Bharat Mata Mandir', 'Kolkata', 'Historic temple', '2025-10-03 12:43:23'),
(129, 'Shree Sai Mandir', 'Shirdi', 'Famous Sai Baba temple', '2025-10-03 12:43:23'),
(130, 'Shree Annapurna Mandir', 'Varanasi', 'Ancient goddess temple', '2025-10-03 12:43:23'),
(131, 'Shree Keshava Mandir', 'Mathura', 'Krishna temple', '2025-10-03 12:43:23'),
(132, 'Shree Radha Raman Mandir', 'Vrindavan', 'Historic Krishna temple', '2025-10-03 12:43:23'),
(133, 'Shree Banke Bihari Mandir', 'Vrindavan', 'Famous Krishna temple', '2025-10-03 12:43:23'),
(134, 'Shree Prem Mandir', 'Vrindavan', 'Modern Krishna temple', '2025-10-03 12:43:23'),
(135, 'Shree Jagadamba Mandir', 'Warangal', 'Famous Shakti temple', '2025-10-03 12:43:23'),
(136, 'Shree Vagdevi Mandir', 'Hyderabad', 'Popular temple', '2025-10-03 12:43:23'),
(137, 'Shree Chilkur Balaji Mandir', 'Hyderabad', 'Historic Balaji temple', '2025-10-03 12:43:23'),
(138, 'Shree Malleswara Swamy Mandir', 'Hyderabad', 'Famous temple', '2025-10-03 12:43:23'),
(139, 'Shree Bhadrachalam Mandir', 'Telangana', 'Famous Rama temple', '2025-10-03 12:43:23'),
(140, 'Shree Kaleshwaram Mandir', 'Telangana', 'Historic Shiva temple', '2025-10-03 12:43:23'),
(141, 'Shree Ramalayam Mandir', 'Hyderabad', 'Ancient temple', '2025-10-03 12:43:23'),
(142, 'Shree Sai Baba Mandir', 'Hyderabad', 'Popular Sai temple', '2025-10-03 12:43:23'),
(143, 'Shree Venkateswara Mandir', 'Hyderabad', 'Famous temple', '2025-10-03 12:43:23'),
(144, 'Shree Hanuman Mandir', 'Hyderabad', 'Historic Hanuman temple', '2025-10-03 12:43:23'),
(145, 'Shree Meenakshi Mandir', 'Chennai', 'Ancient Meenakshi temple', '2025-10-03 12:43:23'),
(146, 'Shree Kapaleeswarar Mandir', 'Chennai', 'Famous Shiva temple', '2025-10-03 12:43:23'),
(147, 'Shree Annamalaiyar Mandir', 'Tiruvannamalai', 'Historic Shiva temple', '2025-10-03 12:43:23'),
(148, 'Shree Rameswaram Mandir', 'Rameshwaram', 'Sacred pilgrimage', '2025-10-03 12:43:23'),
(149, 'test', 'test', 'test', '2025-10-03 13:44:30');

-- --------------------------------------------------------

--
-- Table structure for table `temple_modules`
--

CREATE TABLE `temple_modules` (
  `id` int(11) NOT NULL,
  `temple_id` int(11) DEFAULT NULL,
  `module_id` int(11) DEFAULT NULL,
  `is_enabled` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `temple_modules`
--

INSERT INTO `temple_modules` (`id`, `temple_id`, `module_id`, `is_enabled`) VALUES
(1, 33, 4, 1),
(2, 33, 5, 1),
(3, 33, 6, 1),
(4, 33, 7, 1),
(5, 33, 8, 1),
(6, 33, 9, 1),
(7, 33, 10, 1),
(8, 33, 11, 0),
(9, 33, 12, 0),
(10, 33, 13, 0),
(11, 33, 14, 0),
(12, 33, 15, 0),
(13, 33, 16, 0),
(14, 33, 17, 0),
(15, 33, 18, 0),
(16, 33, 19, 0),
(17, 33, 20, 0),
(18, 33, 21, 0),
(19, 33, 22, 0),
(20, 33, 23, 0),
(21, 33, 24, 0);

-- --------------------------------------------------------

--
-- Table structure for table `temple_settings`
--

CREATE TABLE `temple_settings` (
  `id` int(11) NOT NULL,
  `temple_id` int(11) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `color_theme` varchar(50) DEFAULT NULL,
  `sidebar` tinyint(1) DEFAULT '1',
  `navbar` tinyint(1) DEFAULT '1',
  `map` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `founded_year` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `temple_settings`
--

INSERT INTO `temple_settings` (`id`, `temple_id`, `logo`, `color_theme`, `sidebar`, `navbar`, `map`, `phone`, `email`, `address`, `founded_year`, `created_at`, `updated_at`) VALUES
(1, 28, NULL, 'red', 1, 0, NULL, '0123456987', 'shreedharniki@gmail.com', 'bidar jb bhb', '2005', '2025-09-11 12:05:45', '2025-10-03 16:03:30');

-- --------------------------------------------------------

--
-- Table structure for table `usertype`
--

CREATE TABLE `usertype` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text,
  `temple_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usertype`
--

INSERT INTO `usertype` (`id`, `name`, `description`, `temple_id`) VALUES
(1, 'admin', 'Administrator', 28),
(2, 'President', 'President of Samithi', 28),
(3, 'Manager', 'Manager', 28),
(4, 'Staff', 'Staff', 28),
(5, 'Devotee', 'Guests including donors, people registering to the trust, etc.', 28),
(7, 'Treasurer', 'Treasurer of Trust', 28),
(8, 'Secretary', 'Secretary of Trust', 28),
(9, 'Member', 'Member of the Temple', 28),
(10, 'nikita', 'stafdwsd', 28);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD KEY `temple_id` (`temple_id`);

--
-- Indexes for table `admin_login_history`
--
ALTER TABLE `admin_login_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Indexes for table `deities`
--
ALTER TABLE `deities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `devotees`
--
ALTER TABLE `devotees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `donations`
--
ALTER TABLE `donations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `temple_id` (`temple_id`);

--
-- Indexes for table `donationtype`
--
ALTER TABLE `donationtype`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gothra`
--
ALTER TABLE `gothra`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `modules`
--
ALTER TABLE `modules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nakshatra`
--
ALTER TABLE `nakshatra`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `rashi`
--
ALTER TABLE `rashi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `seva`
--
ALTER TABLE `seva`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sevabookings`
--
ALTER TABLE `sevabookings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `temples`
--
ALTER TABLE `temples`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `temple_modules`
--
ALTER TABLE `temple_modules`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_temple_module` (`temple_id`,`module_id`),
  ADD KEY `module_id` (`module_id`);

--
-- Indexes for table `temple_settings`
--
ALTER TABLE `temple_settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `temple_id` (`temple_id`);

--
-- Indexes for table `usertype`
--
ALTER TABLE `usertype`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `admin_login_history`
--
ALTER TABLE `admin_login_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `deities`
--
ALTER TABLE `deities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `devotees`
--
ALTER TABLE `devotees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `donations`
--
ALTER TABLE `donations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `donationtype`
--
ALTER TABLE `donationtype`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `gothra`
--
ALTER TABLE `gothra`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `modules`
--
ALTER TABLE `modules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `nakshatra`
--
ALTER TABLE `nakshatra`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `rashi`
--
ALTER TABLE `rashi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `seva`
--
ALTER TABLE `seva`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `sevabookings`
--
ALTER TABLE `sevabookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `temples`
--
ALTER TABLE `temples`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=150;

--
-- AUTO_INCREMENT for table `temple_modules`
--
ALTER TABLE `temple_modules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `temple_settings`
--
ALTER TABLE `temple_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `usertype`
--
ALTER TABLE `usertype`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin_login_history`
--
ALTER TABLE `admin_login_history`
  ADD CONSTRAINT `admin_login_history_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `donations`
--
ALTER TABLE `donations`
  ADD CONSTRAINT `donations_ibfk_1` FOREIGN KEY (`temple_id`) REFERENCES `temples` (`id`);

--
-- Constraints for table `temple_modules`
--
ALTER TABLE `temple_modules`
  ADD CONSTRAINT `temple_modules_ibfk_1` FOREIGN KEY (`temple_id`) REFERENCES `temples` (`id`),
  ADD CONSTRAINT `temple_modules_ibfk_2` FOREIGN KEY (`module_id`) REFERENCES `modules` (`id`);

--
-- Constraints for table `temple_settings`
--
ALTER TABLE `temple_settings`
  ADD CONSTRAINT `temple_settings_ibfk_1` FOREIGN KEY (`temple_id`) REFERENCES `temples` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
