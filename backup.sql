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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (1,'Dental Floss Rodeo','2021-08-02 00:00:00','2021-08-05 00:00:00','1234 Apostrophe Lane',NULL,'Billings','MT',59101,1),(2,'The Final Cut','2021-08-09 04:00:00','2021-08-12 04:00:00','601 13th Streew NW','','Washinton','Choose...',20005,2),(3,'Yellow Submarine tour','2021-08-02 00:00:00','2021-08-02 00:00:00','124 Conch St.',NULL,'Bikini Bottom','HI',90210,3);
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
INSERT INTO `Session` VALUES ('-WRBsEsWwqbV4Yii0MB4Jcb9INyngjcL','2021-07-20 12:10:25','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}','2021-07-19 12:10:25','2021-07-19 12:10:25'),('EkE4XzgTfv-cUrhLDUPWby9EIhMKcBt2','2021-07-20 02:46:39','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}','2021-07-19 02:46:39','2021-07-19 02:46:39'),('f_53Gq1tAjyXGeqRP1S3nTEApX21vy-6','2021-07-20 14:48:07','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"user_id\":2,\"logged_in\":true}','2021-07-19 12:49:10','2021-07-19 14:48:07');
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Paul','McCarthy','paul@isdead.com','$2b$10$Q1D9VdBmjOnN7BZ1M8YJHuekvGRhAo9JCUxAZOd8coqSxcK5aDjBK'),(2,'Roger','Waters','roger@thewall.com','$2b$10$Kk0QpKfiSe2shspIWPixT.H3g4QPN1q7UtAzZGBmEltJvx7/wkoVC'),(3,'Frank','Zappa','frank@yellowsnow.com','$2b$10$hV3bhAQ.42NcY97QkOjwJO5UpMLNPLrqyj499YfETiXku0r1/fDpq'),(4,'Daniel','Shoup','dan@signup.com','$2b$10$IVbjJYGo/uUk7KXRWcq7nOr9JHC1zT1vnQD88VpuLsRwC8ikFwx5O'),(5,'Joe','Piscopoe','joe@joe.com','$2b$10$ZSDprDAb0e48yp8M8jlTeepg8YPVOJUPD94hHr7sJRwqubYu7uXb6'),(6,'John','Doe','john@doe.com','$2b$10$SoXCuhoKF9d0681qdE/7yeDaw9L0bLo4i9AGDpsM6Ur9ud3LtmlMW'),(7,'Muddy','Waters','mud@blues.com','$2b$10$DjJYdZ.idgwo4f3mI18Nne9UNU8YZML4xTwSzlOUGaPYndfeOCax.');
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

-- Dump completed on 2021-07-19 11:56:44
