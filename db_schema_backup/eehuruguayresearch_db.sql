-- phpMyAdmin SQL Dump
-- version 4.0.10.20
-- https://www.phpmyadmin.net
--
-- Host: tethys.cse.buffalo.edu:3306
-- Generation Time: May 16, 2019 at 03:37 PM
-- Server version: 5.1.65-log
-- PHP Version: 5.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `eehuruguayresearch_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `Freezers`
--

CREATE TABLE IF NOT EXISTS `Freezers` (
  `key_internal` int(11) NOT NULL AUTO_INCREMENT,
  `lab_name` varchar(50) DEFAULT NULL,
  `storage_temp` int(11) DEFAULT NULL,
  PRIMARY KEY (`key_internal`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

-- --------------------------------------------------------

--
-- Table structure for table `Samples`
--

CREATE TABLE IF NOT EXISTS `Samples` (
  `key_internal` int(11) NOT NULL AUTO_INCREMENT,
  `id` int(11) NOT NULL,
  `eval` int(50) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `hb` text NOT NULL,
  `pb` text NOT NULL,
  `density` float NOT NULL,
  `type` text NOT NULL,
  `aliquots` int(11) NOT NULL DEFAULT '1',
  `initialstorageconditions` text NOT NULL,
  `bht` tinyint(1) NOT NULL,
  `edta` tinyint(1) NOT NULL,
  `heparin` tinyint(1) NOT NULL,
  `mpa` tinyint(1) NOT NULL,
  `othertreatments` text NOT NULL,
  `foilwrapped` tinyint(1) NOT NULL,
  `unrestrictedconsent` tinyint(1) NOT NULL DEFAULT '0',
  `notes` text NOT NULL,
  PRIMARY KEY (`key_internal`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=904 ;

-- --------------------------------------------------------

--
-- Table structure for table `Shipments_batch`
--

CREATE TABLE IF NOT EXISTS `Shipments_batch` (
  `key_internal` int(11) NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `shipping_company` varchar(50) DEFAULT NULL,
  `from` text,
  `to` text,
  `samples` int(11) NOT NULL,
  `shipping_conditions` text NOT NULL,
  `other_shipping_conditions` text NOT NULL,
  `notes` text NOT NULL,
  `received` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`key_internal`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=21 ;

-- --------------------------------------------------------

--
-- Table structure for table `Shipment_tubes`
--

CREATE TABLE IF NOT EXISTS `Shipment_tubes` (
  `key_internal` int(11) NOT NULL AUTO_INCREMENT,
  `shipment_key_internal` int(11) DEFAULT NULL,
  `tube_key_internal` int(11) DEFAULT NULL,
  PRIMARY KEY (`key_internal`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

-- --------------------------------------------------------

--
-- Table structure for table `Tubes`
--

CREATE TABLE IF NOT EXISTS `Tubes` (
  `key_internal` int(11) NOT NULL AUTO_INCREMENT,
  `sample_key_internal` int(11) DEFAULT NULL,
  `in_shipment` tinyint(1) NOT NULL DEFAULT '0',
  `shipment_id` int(11) NOT NULL,
  PRIMARY KEY (`key_internal`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE IF NOT EXISTS `Users` (
  `email` varchar(50) NOT NULL DEFAULT '',
  `admin` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
