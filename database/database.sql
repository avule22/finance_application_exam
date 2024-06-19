-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: finansijee
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `korisnici`
--

DROP TABLE IF EXISTS `korisnici`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `korisnici` (
  `korisnik_id` int NOT NULL AUTO_INCREMENT,
  `ime` varchar(50) COLLATE utf8mb3_unicode_ci NOT NULL,
  `prezime` varchar(50) COLLATE utf8mb3_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb3_unicode_ci NOT NULL,
  `sifra` varchar(100) COLLATE utf8mb3_unicode_ci NOT NULL,
  `budzet` decimal(10,2) NOT NULL,
  PRIMARY KEY (`korisnik_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `korisnici`
--

LOCK TABLES `korisnici` WRITE;
/*!40000 ALTER TABLE `korisnici` DISABLE KEYS */;
INSERT INTO `korisnici` VALUES (33,'Petar','Perić','petar12@gmail.com','petar123',1500.00),(34,'Milos','Mihić','mia12miha@gmail.com','mih123',9000.00);
/*!40000 ALTER TABLE `korisnici` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transakcije`
--

DROP TABLE IF EXISTS `transakcije`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transakcije` (
  `transakcije_id` int NOT NULL AUTO_INCREMENT,
  `korisnik_id` int NOT NULL,
  `iznos` decimal(10,2) NOT NULL,
  `tip` enum('PRIHOD','RASHOD') COLLATE utf8mb3_unicode_ci NOT NULL,
  `opis` text COLLATE utf8mb3_unicode_ci,
  `datum_unosa` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`transakcije_id`),
  KEY `korisnik_id` (`korisnik_id`),
  CONSTRAINT `transakcije_ibfk_1` FOREIGN KEY (`korisnik_id`) REFERENCES `korisnici` (`korisnik_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transakcije`
--

LOCK TABLES `transakcije` WRITE;
/*!40000 ALTER TABLE `transakcije` DISABLE KEYS */;
INSERT INTO `transakcije` VALUES (31,33,60000.00,'PRIHOD','Plata','2024-06-14 19:43:37'),(32,34,7000.00,'RASHOD','Računi','2024-06-14 19:43:54');
/*!40000 ALTER TABLE `transakcije` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-19 17:45:26
