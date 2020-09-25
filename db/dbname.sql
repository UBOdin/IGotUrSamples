-- MySQL dump 10.13  Distrib 5.1.63, for unknown-linux-gnu (x86_64)
--
-- Host: tethys.cse.buffalo.edu    Database: eehuruguayresearch_db
-- ------------------------------------------------------
-- Server version	5.1.65-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Freezers`
--

DROP TABLE IF EXISTS `Freezers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Freezers` (
  `key_internal` int(11) NOT NULL AUTO_INCREMENT,
  `lab_name` varchar(50) DEFAULT NULL,
  `storage_temp` int(11) DEFAULT NULL,
  PRIMARY KEY (`key_internal`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Freezers`
--

LOCK TABLES `Freezers` WRITE;
/*!40000 ALTER TABLE `Freezers` DISABLE KEYS */;
INSERT INTO `Freezers` VALUES (1,'test_freezer_1',10),(2,'test_freezer_2',20);
/*!40000 ALTER TABLE `Freezers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Samples`
--

DROP TABLE IF EXISTS `Samples`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Samples` (
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
) ENGINE=MyISAM AUTO_INCREMENT=908 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Samples`
--

LOCK TABLES `Samples` WRITE;
/*!40000 ALTER TABLE `Samples` DISABLE KEYS */;
INSERT INTO `Samples` VALUES (905,671,1,'2019-07-22','','',0,'Blood',1,'Room temperature',0,0,0,0,'',0,1,''),(878,875,2,'2019-04-28','3.3','3.3',0,'Blood',3,'Room temperature',0,0,0,0,'',1,1,''),(879,876,1,'2019-04-24','0','0',3.3,'Urine',6,'Room temperature',0,0,0,0,'',1,1,''),(880,880,1,'2019-04-24','3.3','3.3',3.3,'Blood',3,'Room temperature',0,0,0,0,'',0,1,''),(881,990,1,'2019-05-05','3.3','0',3.3,'Hair',6,'Room temperature',1,0,1,1,'',0,1,''),(882,991,1,'0000-00-00','0','0',0,'Serum',1,'Room temperature',0,0,0,0,'',0,1,''),(883,992,2,'2019-05-05','','',0,'Hair',1,'Room temperature',0,0,0,0,'',0,1,''),(884,200,2,'2019-05-06','12.1','<3.3',1.0024,'Blood',2,'4Â° C',0,0,0,0,'',0,1,''),(885,200,2,'2019-05-06','12.1','<3.3',1.0024,'Serum',3,'-20Â° C',0,0,0,0,'',0,1,''),(886,200,2,'2019-05-06','12.1','<3.3',1.0024,'Urine',4,'-20Â° C',0,0,0,0,'',0,1,''),(887,843,1,'2019-05-06','','',0,'Blood',12,'Room temperature',0,0,0,0,'',0,1,''),(888,875,2,'2019-05-07','','',0,'Plasma',2,'Room temperature',0,0,0,0,'',0,1,''),(889,875,2,'2019-05-07','','',0,'Soil',3,'Room temperature',0,0,0,0,'',0,1,''),(890,875,2,'2019-05-07','','',0,'Blood Spot',3,'Room temperature',0,0,0,0,'',0,1,''),(891,875,1,'2019-05-07','','',0,'Blood',2,'Room temperature',0,0,0,0,'',0,1,''),(892,992,1,'2019-05-10','','',0,'Urine',3,'Room temperature',0,0,0,0,'',0,1,''),(893,998,1,'2019-05-12','','',0,'Blood',3,'Room temperature',0,0,0,0,'',0,1,''),(894,999,1,'2019-05-12','','',0,'Blood',3,'Room temperature',0,0,0,0,'',0,1,''),(895,999,2,'2019-05-12','','',0,'Blood',3,'Room temperature',0,0,0,0,'',0,1,''),(896,999,3,'2019-05-12','','',0,'Blood',3,'Room temperature',0,0,0,0,'',0,1,''),(897,999,3,'2019-05-12','','',0,'Blood Spot',3,'Room temperature',0,0,0,0,'',0,1,''),(898,999,4,'2019-05-12','','',0,'Blood',3,'Room temperature',0,0,0,0,'',0,1,''),(899,999,5,'2019-05-12','','',0,'Blood',3,'Room temperature',0,0,0,0,'',0,1,''),(906,671,2,'2019-07-22','','',0,'Blood',2,'Room temperature',0,0,0,0,'',0,1,''),(901,759,2,'2019-05-13','12.1','<3.3',1.002,'Urine',1,'-20Â° C',0,0,0,0,'',0,1,''),(902,674,12,'2019-05-16','','',0,'Dust',3,'Room temperature',0,0,0,0,'',0,1,''),(903,444,6,'2019-05-16','','',0,'Water',5,'Room temperature',0,0,0,0,'',0,1,''),(904,111,1,'2019-05-25','','',0,'Blood Spot',1,'Room temperature',0,0,0,0,'',0,1,''),(907,711,1,'2019-07-22','','',0,'Blood',1,'Room temperature',0,0,0,0,'',0,1,'');
/*!40000 ALTER TABLE `Samples` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Shipment_tubes`
--

DROP TABLE IF EXISTS `Shipment_tubes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Shipment_tubes` (
  `key_internal` int(11) NOT NULL AUTO_INCREMENT,
  `shipment_key_internal` int(11) DEFAULT NULL,
  `tube_key_internal` int(11) DEFAULT NULL,
  PRIMARY KEY (`key_internal`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Shipment_tubes`
--

LOCK TABLES `Shipment_tubes` WRITE;
/*!40000 ALTER TABLE `Shipment_tubes` DISABLE KEYS */;
INSERT INTO `Shipment_tubes` VALUES (1,20,9),(2,20,10),(3,21,11),(4,22,12),(5,23,54),(6,23,53),(7,23,52),(8,23,51);
/*!40000 ALTER TABLE `Shipment_tubes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Shipments_batch`
--

DROP TABLE IF EXISTS `Shipments_batch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Shipments_batch` (
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
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Shipments_batch`
--

LOCK TABLES `Shipments_batch` WRITE;
/*!40000 ALTER TABLE `Shipments_batch` DISABLE KEYS */;
INSERT INTO `Shipments_batch` VALUES (1,'2019-05-01',NULL,'Uruguay','University at Buffalo',12,'','','',0),(2,'2019-05-09',NULL,'University at Buffalo ','UT Austin',5,'','','',0),(7,'2019-05-09',NULL,'University at Buffalo','Virginia Tech',2,'','','',0),(6,'2019-05-09',NULL,'University at Buffalo','UW Madison',8,'','','',0),(9,'2019-05-14',NULL,'University at Buffalo','Ft. Lauderdale',1,'','','',0),(10,'2019-05-14',NULL,'University at Buffalo','Ft. Lauderdale',1,'','','',0),(11,'2019-05-14',NULL,'University at Buffalo','Ft. Lauderdale',1,'','','',0),(12,'2019-05-14',NULL,'University at Buffalo','Ft. Lauderdale',1,'','','',0),(13,'2019-05-14',NULL,'University at Buffalo','Atlanta',1,'','','',0),(14,'2019-05-15',NULL,'University at Buffalo','Birmingham',1,'','','',0),(15,'2019-05-15',NULL,'University at Buffalo','Birmingham',1,'','','',0),(16,'2019-05-15',NULL,'University at Buffalo','Birmingham',1,'','','',0),(17,'2019-05-15',NULL,'University at Buffalo','Birmingham',1,'','','',0),(18,'2019-05-15',NULL,'University at Buffalo','Birmingham',1,'','','',0),(19,'2019-05-16',NULL,'University at Buffalo','Philadelphia',1,'','','',1),(20,'2019-05-16',NULL,'University at Buffalo','Philadelphia',1,'','','',1),(21,'2019-05-17',NULL,'University at Buffalo','Charlottesville',1,'Dry ice','None','',1),(22,'2019-05-17',NULL,'University at Buffalo','Charlottesville',1,'Dry ice','None','Testing a note!',1),(23,'2020-09-14',NULL,'University at Buffalo','University at Albany',3,'Dry ice','1 large box','Agreed to discard samples after analysis',1);
/*!40000 ALTER TABLE `Shipments_batch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tubes`
--

DROP TABLE IF EXISTS `Tubes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tubes` (
  `key_internal` int(11) NOT NULL AUTO_INCREMENT,
  `sample_key_internal` int(11) DEFAULT NULL,
  `in_shipment` tinyint(1) NOT NULL DEFAULT '0',
  `shipment_id` int(11) NOT NULL,
  PRIMARY KEY (`key_internal`)
) ENGINE=MyISAM AUTO_INCREMENT=55 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tubes`
--

LOCK TABLES `Tubes` WRITE;
/*!40000 ALTER TABLE `Tubes` DISABLE KEYS */;
INSERT INTO `Tubes` VALUES (1,899,1,18),(2,899,1,18),(3,899,1,18),(53,906,0,23),(5,901,0,0),(6,902,0,19),(7,902,0,19),(8,902,0,0),(9,903,0,20),(10,903,0,20),(11,903,0,21),(12,903,0,22),(13,903,0,0),(49,886,0,0),(48,886,0,0),(47,890,0,0),(46,890,0,0),(52,906,0,23),(51,905,0,23),(20,876,0,0),(21,876,0,0),(22,876,0,0),(23,876,0,0),(24,876,0,0),(25,876,0,0),(26,876,0,0),(27,876,0,0),(28,876,0,0),(29,876,0,0),(30,904,0,0),(31,876,0,0),(32,876,0,0),(33,876,0,0),(34,876,0,0),(35,876,0,0),(36,876,0,0),(37,876,0,0),(38,876,0,0),(39,876,0,0),(40,876,0,0),(41,876,0,0),(42,876,0,0),(43,876,0,0),(44,876,0,0),(45,876,0,0),(50,886,0,0),(54,907,0,23);
/*!40000 ALTER TABLE `Tubes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `email` varchar(50) NOT NULL DEFAULT '',
  `admin` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-18  1:40:59
