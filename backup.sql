-- MySQL dump 10.13  Distrib 8.0.25, for macos11 (x86_64)
--
-- Host: localhost    Database: signUp_db
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `id` int NOT NULL AUTO_INCREMENT,
  `event_name` varchar(255) NOT NULL,
  `event_start_date` datetime NOT NULL,
  `event_end_date` datetime NOT NULL,
  `event_address_line1` varchar(255) NOT NULL,
  `event_address_line2` varchar(255) DEFAULT NULL,
  `event_address_city` varchar(255) NOT NULL,
  `event_address_state` varchar(255) NOT NULL,
  `event_address_zip` int NOT NULL,
  `event_owner` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `event_owner` (`event_owner`),
  CONSTRAINT `event_ibfk_1` FOREIGN KEY (`event_owner`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (1,'Tear Down The Wall','2021-08-01 04:00:00','2021-08-04 04:00:00','1234 Apostrophe Lane','','Billings','MT',59101,1),(2,'The Final Cut','2021-08-09 04:00:00','2021-08-12 04:00:00','601 13th Streew NW',NULL,'Washinton','D.C.',20005,2),(3,'Yellow Submarine tour','2021-08-02 00:00:00','2021-08-02 00:00:00','124 Conch St.',NULL,'Bikini Bottom','HI',90210,3),(4,'Moonlighting','2021-08-12 00:00:00','2021-08-12 00:00:00','1234 Arnold Lane',NULL,'Missoula','MT',59101,1),(5,'Moon Spotting','2021-08-12 00:00:00','2021-08-12 00:00:00','1234 Arnold Lane',NULL,'Butte','MT',59101,1),(6,'Pigmy Pony Rodeo','2021-11-05 00:00:00','2021-11-07 00:00:00','999 Main St.','','Butte','MT',59801,NULL),(7,'Moon Spotting','2021-08-12 00:00:00','2021-08-12 00:00:00','1234 Arnold Lane',NULL,'Billings','MT',59101,NULL),(8,'Moon Spotting','2021-08-12 00:00:00','2021-08-12 00:00:00','1234 Arnold Lane',NULL,'Billings','MT',59101,NULL),(9,'Ice Skating','2021-11-05 00:00:00','2021-11-07 00:00:00','15 Icerink Lane','','Nome','AK',90990,NULL);
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Session`
--

DROP TABLE IF EXISTS `Session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Session` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Session`
--

LOCK TABLES `Session` WRITE;
/*!40000 ALTER TABLE `Session` DISABLE KEYS */;
INSERT INTO `Session` VALUES ('2CSTbiGcSTkbdvI40Yrfd0fPQc2koMFC','2021-07-20 01:28:51','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"user_id\":1,\"logged_in\":true}','2021-07-17 05:25:54','2021-07-19 01:28:51'),('iettklpqy_RNRwTgpbWhVdBFed08RJu1','2021-07-20 12:31:21','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"user_id\":1,\"logged_in\":true}','2021-07-17 04:52:48','2021-07-19 12:31:21'),('RwJfw-jv4i32y4vys0tIYra4KXXdeu6E','2021-07-20 14:47:36','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"user_id\":1,\"logged_in\":true}','2021-07-19 12:06:38','2021-07-19 14:47:36');
/*!40000 ALTER TABLE `Session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `event_id` int DEFAULT NULL,
  `volunteer` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `event_id` (`event_id`),
  KEY `volunteer` (`volunteer`),
  CONSTRAINT `task_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `task_ibfk_2` FOREIGN KEY (`volunteer`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES (1,'Parking',1,1),(2,'Concessions',1,2),(3,'Security',1,3),(4,'First-aid',1,NULL),(5,'Parking',2,3),(6,'Concessions',2,2),(7,'Security',2,1),(8,'First-aid',2,NULL),(9,'Parking',3,NULL),(10,'Concessions',3,2),(11,'Security',3,3),(12,'First-aid',3,1);
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Roger','Waters','roger@thewall.com','$2b$10$Z0zGIFR3D1jV.ZNUC/FXreaU2U7jJEmkNze8Z7PlirDlWj5P5olp.'),(2,'Paul','McCarthy','paul@isdead.com','$2b$10$6CGs3zqG9aBFGKEwKAKLpe1DypPjOok81BvKoACpZKmDhHUUpnOsS'),(3,'Frank','Zappa','frank@yellowsnow.com','$2b$10$J4voXyUOdV/5A75GJwQdbesTYAFuOyZn1ukqleoSsf1gzbUmjZpja'),(5,'Barry','St. Pierre','barry@stpierre.com','$2b$10$VAABVaUBwSGtw6Zppuj0/OqxaQdnRO5rmuMUaHbE9fK19wsTwMzuS'),(6,'Barry','St. Pierre','barry.stpierre@gmail.com','$2b$10$QEAb0liGMHudz6fTyr2eEOq52./94XOJBGvEa5OXZcWvg62OBmlZq');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-19 11:54:23
