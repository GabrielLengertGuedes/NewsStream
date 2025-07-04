-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: newsstream_db
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `acessos`
--

DROP TABLE IF EXISTS `acessos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acessos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `data_acesso` date NOT NULL,
  `total_acessos` int(11) DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `data_acesso` (`data_acesso`)
) ENGINE=InnoDB AUTO_INCREMENT=637 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acessos`
--

LOCK TABLES `acessos` WRITE;
/*!40000 ALTER TABLE `acessos` DISABLE KEYS */;
INSERT INTO `acessos` VALUES (1,'2025-06-29',68),(69,'2025-06-30',150),(219,'2025-07-01',188),(407,'2025-07-02',144),(551,'2025-07-03',37),(588,'2025-07-04',49);
/*!40000 ALTER TABLE `acessos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nome` (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (16,'Automóveis'),(11,'Ciência'),(12,'Cultura'),(10,'Educação'),(8,'Entretenimento'),(3,'Esportes'),(6,'Gastronomia'),(17,'Jogos'),(9,'Justiça'),(7,'Meio Ambiente'),(15,'Moda'),(5,'Negócios'),(1,'Política'),(4,'Saúde'),(13,'Segurança Pública'),(2,'Tecnologia'),(14,'Turismo');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias_seguidas`
--

DROP TABLE IF EXISTS `categorias_seguidas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categorias_seguidas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `categoria_id` int(11) NOT NULL,
  `data_seguida` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario_id` (`usuario_id`,`categoria_id`),
  KEY `categoria_id` (`categoria_id`),
  CONSTRAINT `categorias_seguidas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  CONSTRAINT `categorias_seguidas_ibfk_2` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias_seguidas`
--

LOCK TABLES `categorias_seguidas` WRITE;
/*!40000 ALTER TABLE `categorias_seguidas` DISABLE KEYS */;
INSERT INTO `categorias_seguidas` VALUES (5,124,7,'2025-06-29 16:34:29'),(9,124,4,'2025-06-30 16:55:44'),(12,124,1,'2025-06-30 17:37:16'),(14,123,7,'2025-07-01 14:57:51'),(15,123,17,'2025-07-01 14:58:01'),(16,125,13,'2025-07-01 14:58:25'),(17,125,3,'2025-07-01 14:58:45'),(18,125,14,'2025-07-01 14:59:09'),(19,126,3,'2025-07-01 15:00:56'),(20,126,7,'2025-07-01 15:01:37'),(21,124,16,'2025-07-01 17:19:22'),(22,127,13,'2025-07-02 00:59:18'),(23,127,3,'2025-07-02 00:59:46'),(24,125,5,'2025-07-03 18:36:31');
/*!40000 ALTER TABLE `categorias_seguidas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comentarios`
--

DROP TABLE IF EXISTS `comentarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comentarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `noticia_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `autor_nome` varchar(255) NOT NULL,
  `texto` text NOT NULL,
  `data_comentario` datetime DEFAULT current_timestamp(),
  `denunciado` tinyint(1) DEFAULT 0,
  `motivoDenuncia` varchar(255) DEFAULT NULL,
  `detalhesDenuncia` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `noticia_id` (`noticia_id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`noticia_id`) REFERENCES `noticias` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comentarios`
--

LOCK TABLES `comentarios` WRITE;
/*!40000 ALTER TABLE `comentarios` DISABLE KEYS */;
INSERT INTO `comentarios` VALUES (106,6,123,'Gabriel','Adorei a notícia','2025-06-29 03:40:00',0,NULL,NULL),(107,6,125,'Anttonio','Notícia interessante','2025-06-29 03:40:25',1,'Outro','não gostei do comentário'),(111,7,123,'Gabriel','Adorei a notícia','2025-07-01 14:57:55',0,NULL,NULL),(112,27,123,'Gabriel','Gosto muito de games','2025-07-01 14:58:10',0,NULL,NULL),(113,2,125,'Anttonio','Grande campeonato feito pelo time','2025-07-01 14:59:03',0,NULL,NULL),(114,24,125,'Anttonio','Muitos desses destinos são lindos','2025-07-01 14:59:23',0,NULL,NULL),(115,2,126,'paula','Vitoria muito merecida','2025-07-01 15:01:07',0,NULL,NULL),(116,7,126,'paula','Acho muito importante esses temas','2025-07-01 15:01:34',0,NULL,NULL),(117,6,124,'admin','muito boa a noticia sobre o mercado!','2025-07-01 15:22:22',0,NULL,NULL),(118,11,124,'admin','Notícia interessante','2025-07-01 19:09:03',1,'Spam ou propaganda',NULL),(119,34,124,'admin','muito boa a noticia!','2025-07-01 23:30:39',0,NULL,NULL),(120,31,127,'Leonardo','Tecnologia muito importante para manter a segurança','2025-07-02 00:59:38',0,NULL,NULL),(121,2,127,'Leonardo','Atuação histórica dos jogadores','2025-07-02 01:00:04',0,NULL,NULL),(122,2,123,'Gabriel','Campeões!!!','2025-07-02 01:32:31',0,NULL,NULL);
/*!40000 ALTER TABLE `comentarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 trigger after_insert_comentario
after insert on comentarios
for each row
begin
if new.denunciado = 0 then
update noticias
set total_comentarios = total_comentarios + 1
where id = new.noticia_id;
end if;
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `curtidas`
--

DROP TABLE IF EXISTS `curtidas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `curtidas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `noticia_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `data_curtida` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `noticia_id` (`noticia_id`,`usuario_id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `curtidas_ibfk_1` FOREIGN KEY (`noticia_id`) REFERENCES `noticias` (`id`) ON DELETE CASCADE,
  CONSTRAINT `curtidas_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curtidas`
--

LOCK TABLES `curtidas` WRITE;
/*!40000 ALTER TABLE `curtidas` DISABLE KEYS */;
INSERT INTO `curtidas` VALUES (3,34,123,'2025-06-29 02:42:39'),(14,7,124,'2025-06-29 16:34:31'),(18,14,124,'2025-06-30 16:55:43'),(19,6,124,'2025-06-30 17:37:11'),(20,11,124,'2025-06-30 17:37:19'),(21,7,123,'2025-07-01 14:57:56'),(22,27,123,'2025-07-01 14:58:03'),(23,2,125,'2025-07-01 14:58:18'),(24,23,125,'2025-07-01 14:58:24'),(25,24,125,'2025-07-01 14:59:10'),(26,2,126,'2025-07-01 15:00:55'),(27,7,126,'2025-07-01 15:01:37'),(28,34,124,'2025-07-01 17:19:20'),(29,20,124,'2025-07-01 17:33:12'),(30,31,127,'2025-07-02 00:59:17'),(31,2,127,'2025-07-02 00:59:47');
/*!40000 ALTER TABLE `curtidas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `noticias`
--

DROP TABLE IF EXISTS `noticias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `noticias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `resumo` text NOT NULL,
  `conteudo` longtext NOT NULL,
  `categoria` varchar(100) NOT NULL,
  `imagemUrl` varchar(255) DEFAULT NULL,
  `data_publicacao` date NOT NULL,
  `autor` varchar(255) NOT NULL DEFAULT 'NewsStream',
  `denunciado` tinyint(1) DEFAULT 0,
  `motivoDenuncia` varchar(255) DEFAULT NULL,
  `detalhesDenuncia` text DEFAULT NULL,
  `total_comentarios` int(11) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `noticias`
--

LOCK TABLES `noticias` WRITE;
/*!40000 ALTER TABLE `noticias` DISABLE KEYS */;
INSERT INTO `noticias` VALUES (1,'Congresso Aprova Reforma Tributária Após Semanas de Debate','Governo unifica impostos, cria cashback para famílias de baixa renda e promete simplificação no sistema tributário.','\n        <p>A aprovação da Reforma Tributária no Congresso Nacional marca o fim de um período de intensos debates e negociações. A proposta tem como principal objetivo simplificar o complexo sistema tributário brasileiro, substituindo múltiplos impostos por um modelo unificado. Isso deve desburocratizar as operações para empresas e cidadãos.</p>\n        <p>Um dos pontos mais celebrados da reforma é a criação do mecanismo de cashback para famílias de baixa renda, que visa tornar a tributação mais justa, devolvendo parte dos impostos pagos. A expectativa é que essa medida beneficie milhões de brasileiros, aumentando o poder de compra e reduzindo a desigualdade social.</p>\n        <p>A nova legislação segue agora para sanção presidencial e será implementada de forma gradual nos próximos anos. Especialistas preveem que a reforma pode impulsionar o crescimento econômico e atrair novos investimentos para o país, gerando mais empregos e renda. Resta acompanhar a aplicação prática e seus efeitos a longo prazo.</p>\n      ','Política','/images/Politicaa.jpg','2025-05-13','NewsStream',1,'Assédio ou bullying',NULL,0),(2,'União FC Conquista Campeonato Nacional em Final Histórica','Em uma virada nos minutos finais, o time quebra um jejum de 15 anos e faz história no futebol nacional.','\n        <p>O União FC protagonizou uma das finais mais emocionantes do Campeonato Nacional, conquistando o título com uma virada eletrizante nos últimos minutos do segundo tempo. A torcida, que lotou o estádio, celebrou intensamente o fim de um jejum de 15 anos sem grandes conquistas.</p>\n        <p>Este título não é apenas uma vitória esportiva; ele reacende o orgulho de uma comunidade inteira e solidifica o retorno do União FC à elite do futebol brasileiro, garantindo sua participação em competições internacionais. O time demonstrou garra, resiliência e um trabalho em equipe impecável.</p>\n        <p>Com a taça na mão, a diretoria do clube já sinalizou planos de investimento em novos talentos e infraestrutura, visando manter o alto nível de desempenho nas próximas temporadas. A cidade está em festa, e os jogadores são agora lendas para a nova geração de torcedores.</p>\n      ','Esportes','/images/Trofeu.jpg','2025-04-08','NewsStream',0,NULL,NULL,2),(3,'Reforma Eleitoral Entra em Debate no Congresso','Senadores analisam novas regras para financiamento de campanhas e transparência nas eleições.','\n        <p>O Senado Federal deu início aos debates sobre uma nova proposta de reforma eleitoral, que busca modernizar e tornar mais transparentes as regras para as eleições no Brasil. Entre os pontos centrais, estão a discussão sobre o financiamento de campanhas, os limites para doações e a fiscalização da prestação de contas.</p>\n        <p>A importância desta reforma reside na necessidade de garantir eleições mais justas e equitativas, combatendo o abuso do poder econômico e a disseminação de desinformação. O objetivo é fortalecer a democracia e aumentar a confiança dos eleitores no processo eleitoral.</p>\n        <p>As discussões prometem ser intensas nas próximas semanas, com a participação de parlamentares, juristas e representantes da sociedade civil. Se aprovada, a reforma poderá ter um impacto significativo nas próximas eleições, alterando a dinâmica das campanhas e a forma como os candidatos se relacionam com o eleitorado.</p>\n      ','Política','/images/Politica2.jpg','2025-03-03','NewsStream',0,NULL,NULL,0),(4,'Cientistas Revelam Avanço Revolucionário em Inteligência Artificial','Novo modelo de IA promete simular raciocínio humano com precisão nunca vista antes.','\n        <p>Pesquisadores de um laboratório de ponta anunciaram um avanço notável no campo da Inteligência Artificial. Eles desenvolveram um novo modelo de IA capaz de simular processos de raciocínio humano com uma precisão sem precedentes, aprendendo e adaptando-se a situações complexas de forma autônoma.</p>\n        <p>As implicações dessa tecnologia são vastas e podem transformar diversas áreas, desde a medicina, com a criação de assistentes de diagnóstico mais eficientes, até a educação, com plataformas de aprendizado personalizadas. A capacidade de simular o raciocínio humano abre portas para soluções inovadoras em problemas que antes pareciam intransponíveis.</p>\n        <p>Atualmente, o modelo está em fase de testes controlados e deve ser aplicado primeiramente em sistemas educacionais e assistentes médicos, com a expectativa de expandir para outras aplicações em breve. A comunidade científica está eufórica com o potencial dessa descoberta para o futuro da tecnologia.</p>\n      ','Tecnologia','/images/Tecnologia.jpg','2025-01-24','NewsStream',0,NULL,NULL,0),(5,'Seleção Brasileira Inicia Preparação Para a Copa do Mundo','Técnico divulga convocação com surpresas e aposta em jovens talentos.','\n        <p>A Seleção Brasileira deu o pontapé inicial em sua preparação para a próxima Copa do Mundo. O técnico, em coletiva de imprensa, divulgou a lista de convocados, que trouxe algumas surpresas e uma aposta clara em jovens talentos que se destacaram recentemente em seus clubes. Veteranos renomados acabaram ficando de fora, sinalizando uma renovação no elenco.</p>\n        <p>Essa convocação reflete uma nova filosofia de jogo, buscando mais velocidade, dinamismo e uma abordagem tática inovadora. A decisão do técnico gerou debate entre torcedores e comentaristas, mas a maioria se mostra otimista com o potencial do novo grupo de jogadores.</p>\n        <p>Os treinamentos intensivos começarão na próxima semana em Teresópolis, seguidos por uma série de amistosos preparatórios agendados para o mês de junho, antes do início da competição. A expectativa é que a equipe chegue à Copa do Mundo com entrosamento e força máxima para brigar pelo título.</p>\n      ','Esportes','/images/Selecao.jpg','2025-02-11','NewsStream',0,NULL,NULL,0),(6,'Mercado Financeiro Fecha em Alta Após Anúncio de Taxas de Juros','        <p>O mercado financeiro brasileiro registrou alta expressiva nesta sexta-feira, reagindo positivamente ao anúncio do Banco Central de manutenção das taxas de juros. O índice Ibovespa, principa...','        <p>O mercado financeiro brasileiro registrou alta expressiva nesta sexta-feira, reagindo positivamente ao anúncio do Banco Central de manutenção das taxas de juros. O índice Ibovespa, principal indicador da bolsa de valores, subiu 2%, refletindo o otimismo dos investidores com a estabilidade econômica.</p>\r\n        <p>A decisão do Banco Central foi interpretada como um sinal de confiança na trajetória de controle da inflação e de estímulo ao crescimento. Essa estabilidade é crucial para atrair investimentos e gerar um ambiente favorável aos negócios, impactando positivamente diversos setores da economia.</p>\r\n        <p>Analistas do mercado preveem que a manutenção das taxas de juros, aliada a outras medidas governamentais, pode gerar novas oportunidades de investimento e impulsionar o crescimento de setores como varejo, construção civil e tecnologia nos próximos meses. A expectativa é de um cenário econômico mais aquecido.</p>\r\n      ','Negócios','/images/Negocios.jpg','2025-05-22','NewsStream',0,NULL,NULL,1),(7,'Projeto Global de Energia Limpa Recebe Financiamento Bilionário','Países firmam parceria para expandir uso de fontes renováveis e reduzir emissões.','\n        <p>Líderes de diversas nações firmaram um acordo histórico para financiar um ambicioso projeto global de energia limpa. O investimento, que soma bilhões de dólares, será direcionado para o desenvolvimento e expansão de fontes de energia renovável, com foco em tecnologias solar, eólica e hidrogênio verde.</p>\n        <p>Esta iniciativa é vista como um marco fundamental no combate às mudanças climáticas, pois visa acelerar a transição energética global e reduzir significativamente as emissões de gases de efeito estufa. Além do impacto ambiental, espera-se que o projeto gere milhões de \"empregos verdes\" e impulsione a inovação tecnológica.</p>\n        <p>Os primeiros projetos piloto devem ser implementados em países em desenvolvimento ainda este ano, com o objetivo de criar modelos replicáveis em larga escala. A cooperação internacional demonstra um compromisso renovado em construir um futuro mais sustentável e energeticamente eficiente para todos.</p>\n      ','Meio Ambiente','/images/Meio-ambiente.jpg','2025-04-27','NewsStream',0,NULL,NULL,0),(8,'Novos Estudos Mostram Avanço Promissor no Tratamento do Câncer','Pesquisadores desenvolvem terapia inovadora que aumenta taxas de recuperação em pacientes com tumores agressivos.','\n        <p>Estudos recentes apresentaram resultados animadores no campo da oncologia, revelando uma nova abordagem terapêutica para o tratamento de tipos agressivos de câncer. A pesquisa, que combinou técnicas de engenharia genética com imunoterapia, demonstrou um aumento significativo nas taxas de recuperação de pacientes.</p>\n        <p>A importância dessa descoberta é imensa, pois ela pode oferecer uma nova perspectiva e esperança para milhares de pacientes que enfrentam tumores de difícil tratamento. Além disso, a metodologia utilizada abre caminho para o desenvolvimento de tratamentos personalizados, adaptados às características genéticas de cada paciente e de seu tumor.</p>\n        <p>Atualmente, os ensaios clínicos estão em fase avançada, e se os resultados continuarem promissores, a nova terapia poderá receber aprovação regulatória nos próximos anos, tornando-se uma ferramenta poderosa na luta contra o câncer. A comunidade médica e científica está otimista com o potencial transformador dessa inovação.</p>\n      ','Saúde','/images/Saude.jpg','2025-03-20','NewsStream',0,NULL,NULL,0),(9,'Filme de Ficção Científica Bate Recorde de Bilheteria Global','Produção arrecada mais de 1 bilhão de dólares e conquista fãs com sua trama envolvente e efeitos visuais revolucionários.','\n        <p>Um novo blockbuster de ficção científica conquistou os cinemas ao redor do mundo, quebrando recordes de bilheteria e superando a marca de 1 bilhão de dólares em menos de um mês de exibição. O filme, aclamado pela crítica e pelo público, se destaca por sua trama envolvente, personagens cativantes e efeitos visuais que redefinem os padrões da indústria.</p>\n        <p>O sucesso estrondoso não apenas reforça o apelo duradouro do gênero de ficção científica, mas também demonstra o poder das grandes produções cinematográficas em atrair e engajar espectadores globalmente. A obra movimentou a indústria do entretenimento e reacendeu o debate sobre o futuro do cinema.</p>\n        <p>Diante da recepção massiva, a produtora já anunciou que a sequência do filme está em fase de pré-produção, prometendo expandir ainda mais o universo narrativo e explorar novas fronteiras visuais. Fãs em todo o mundo aguardam ansiosamente por mais detalhes sobre os próximos capítulos dessa saga.</p>\n      ','Entretenimento','/images/Entretenimento.jpg','2025-02-26','NewsStream',0,NULL,NULL,0),(10,'Supremo Tribunal Decide Sobre Limites da Liberdade de Expressão Online','Decisão histórica define novas diretrizes para conteúdos publicados nas redes sociais.','\n        <p>O Supremo Tribunal Federal (STF) proferiu uma decisão histórica que estabelece novas diretrizes para os limites da liberdade de expressão em plataformas online. A medida visa combater a disseminação de discursos de ódio, desinformação e conteúdos que incitem a violência, buscando um equilíbrio entre o direito individual à expressão e a responsabilidade social no ambiente digital.</p>\n        <p>A importância dessa decisão reside na necessidade de adaptar a legislação às dinâmicas das redes sociais, que muitas vezes se tornam palco para abusos e ataques. A regulamentação busca garantir que as plataformas digitais tenham mecanismos mais eficazes para moderar conteúdos, sem que isso configure censura prévia.</p>\n        <p>As plataformas terão um prazo determinado para se adequarem às novas exigências do STF, sob pena de sanções. A decisão gerou debates acalorados entre defensores da liberdade irrestrita e aqueles que pedem maior responsabilidade no ambiente digital, mas é um passo importante para a construção de um ambiente online mais seguro e ético.</p>\n      ','Justiça','/images/Justica1.jpg','2025-02-18','NewsStream',0,NULL,NULL,0),(11,'Chef Brasileira Ganha Estrela Michelin em Restaurante Sustentável','        <p>Uma chef brasileira conquistou uma prestigiada estrela Michelin para seu restaurante, que se destaca não apenas pela excelência culinária, mas também por sua filosofia de sustentabilidade. ...','        <p>Uma chef brasileira conquistou uma prestigiada estrela Michelin para seu restaurante, que se destaca não apenas pela excelência culinária, mas também por sua filosofia de sustentabilidade. O reconhecimento internacional celebra a criatividade, a inovação e o compromisso com o uso consciente de ingredientes regionais e de pequenos produtores.</p>\r\n        <p>Este prêmio é um marco para a gastronomia brasileira, elevando o patamar da culinária nacional no cenário mundial e mostrando que é possível unir alta gastronomia com práticas ambientalmente responsáveis. A valorização dos produtos locais e a redução do desperdício são pilares que tornaram o restaurante um exemplo a ser seguido.</p>\r\n        <p>Com a estrela Michelin, o restaurante e a chef brasileira devem atrair um público ainda maior, impulsionando o turismo gastronômico no país e abrindo novas oportunidades para outros chefs que buscam trilhar o caminho da sustentabilidade na cozinha. É uma inspiração para toda a indústria.</p>\r\n      ','Gastronomia','/images/Gastronomia1.jpg','2025-04-29','NewsStream',0,NULL,NULL,1),(12,'Escolas Públicas Adotam Tecnologia 5G Para Aulas Interativas','Projeto piloto oferece conectividade de alta velocidade e melhora o desempenho de alunos.','\n        <p>Um projeto piloto inovador está implementando a tecnologia 5G em escolas públicas, revolucionando a forma como o aprendizado acontece. Com conectividade de alta velocidade, os alunos e professores agora podem acessar plataformas virtuais otimizadas, participar de aulas interativas e explorar recursos de realidade aumentada, tornando o processo educacional mais dinâmico e envolvente.</p>\n        <p>A adoção do 5G no ambiente escolar é um passo significativo para a inclusão digital e a modernização do ensino público, reduzindo a lacuna tecnológica entre escolas de diferentes realidades socioeconômicas. A expectativa é que o acesso a ferramentas educacionais avançadas melhore o desempenho dos alunos e prepare-os melhor para os desafios do futuro.</p>\n        <p>Se o projeto piloto demonstrar resultados positivos, a tecnologia 5G será expandida para toda a rede pública de ensino nos próximos anos, transformando o panorama da educação no país. Essa iniciativa promete abrir um leque de possibilidades para métodos de ensino mais personalizados e eficazes.</p>\n      ','Educação','/images/Educacao1.jpg','2025-03-22','NewsStream',0,NULL,NULL,0),(13,'Cientistas Criam Chip Neural Capaz de Interagir Diretamente com o Cérebro','Novo avanço pode permitir comunicação direta entre humanos e máquinas, revolucionando acessibilidade e produtividade.','\n        <p>Cientistas de um instituto de pesquisa de ponta anunciaram a criação de um chip neural inovador, capaz de estabelecer uma comunicação direta e bidirecional com o cérebro humano. Este avanço, que antes parecia restrito à ficção científica, permite interpretar sinais neurais em tempo real e até mesmo enviar estímulos de volta, abrindo portas para aplicações revolucionárias.</p>\n        <p>As implicações dessa tecnologia são vastas, especialmente para a medicina. Ela pode transformar o tratamento de doenças neurológicas como Parkinson e Alzheimer, além de criar novas formas de comunicação e controle para pessoas com deficiências motoras, oferecendo um nível de acessibilidade e autonomia sem precedentes. A produtividade humana também pode ser impactada.</p>\n        <p>Os primeiros testes clínicos com pacientes estão previstos para o próximo ano, com foco inicial em aplicações médicas e no desenvolvimento de dispositivos assistivos. A comunidade científica global está observando de perto, pois este chip neural pode redefinir nossa compreensão da mente humana e a forma como interagimos com a tecnologia.</p>\n      ','Tecnologia','/images/Tecnologia2.jpg','2025-01-18','NewsStream',0,NULL,NULL,0),(14,'Terapia Genética Promete Cura Definitiva para Doença Rara','Pesquisa inovadora demonstra sucesso em reverter mutações genéticas que causam enfermidades hereditárias.','\n        <p>Uma pesquisa inovadora no campo da genética demonstrou resultados promissores ao desenvolver uma terapia capaz de reverter mutações genéticas específicas, oferecendo uma potencial cura definitiva para uma doença rara e hereditária. Este avanço representa um marco significativo na medicina personalizada.</p>\n        <p>A importância dessa descoberta é imensa, pois ela pode transformar a vida de milhares de pacientes que antes não tinham opções terapêuticas eficazes. Ao corrigir a causa-raiz genética da enfermidade, a terapia abre um novo caminho para o tratamento de diversas doenças genéticas, oferecendo a esperança de uma vida plena.</p>\n        <p>Os resultados da pesquisa serão submetidos a agências reguladoras para validação e aprovação. Se confirmados em ensaios clínicos mais amplos, essa abordagem poderá ser aplicada em larga escala nos próximos anos, pavimentando o caminho para o desenvolvimento de terapias similares para outras condições genéticas complexas.</p>\n      ','Saúde','/images/Saude2.jpg','2025-04-23','NewsStream',0,NULL,NULL,0),(15,'Startups de Energia Renovável Recebem Investimento de US$ 5 Bilhões','Capital global é direcionado para inovação sustentável, buscando reduzir impacto ambiental e aumentar eficiência energética.','\n        <p>Um consórcio de investidores globais anunciou um aporte de US$ 5 bilhões em startups que atuam no setor de energia renovável. O capital será direcionado para empresas focadas em inovação em energia solar, eólica, hidrogênio verde e outras tecnologias limpas, com o objetivo de acelerar a transição para uma economia de baixo carbono.</p>\n        <p>Este financiamento massivo é um reflexo do crescente reconhecimento da urgência em combater as mudanças climáticas e do potencial econômico das soluções sustentáveis. A injeção de capital permitirá que essas startups escalem suas operações, desenvolvam novas tecnologias e aumentem a eficiência energética em diversas indústrias.</p>\n        <p>As empresas beneficiadas pelo investimento planejam iniciar testes-piloto e expandir suas capacidades industriais nos próximos 18 meses, com o objetivo de gerar um impacto ambiental positivo significativo e impulsionar o crescimento econômico sustentável em nível global. O setor de energia limpa promete ser um dos grandes motores de inovação.</p>\n      ','Negócios','/images/Negocios2.jpg','2025-03-13','NewsStream',0,NULL,NULL,0),(16,'Inteligência Artificial Agora Cria Receitas Personalizadas Baseadas no Paladar','Restaurantes começam a usar tecnologia que analisa preferências individuais e sugere pratos sob medida para cada cliente.','\n        <p>O universo gastronômico está experimentando uma revolução com a introdução de sistemas de Inteligência Artificial capazes de criar receitas personalizadas. Restaurantes de ponta já estão adotando essa tecnologia, que analisa as preferências individuais dos clientes, restrições alimentares e até mesmo o histórico de consumo para sugerir pratos sob medida, oferecendo uma experiência culinária única e exclusiva.</p>\n        <p>Essa inovação pode transformar a forma como as pessoas se alimentam, indo além do menu fixo e proporcionando refeições que se adaptam perfeitamente aos gostos e necessidades de cada indivíduo. Além de otimizar a satisfação do cliente, a IA pode ajudar na gestão de ingredientes e na redução do desperdício nas cozinhas.</p>\n        <p>Empresas do setor de tecnologia alimentícia já planejam expandir o serviço para plataformas de delivery e para o mercado de alimentos prontos, permitindo que a personalização culinária chegue a um público ainda maior. O futuro da gastronomia promete ser cada vez mais inteligente e adaptado ao paladar de cada um.</p>\n      ','Gastronomia','/images/Gastronomia2.jpg','2025-01-13','NewsStream',0,NULL,NULL,0),(17,'Novo Documentário Sobre Exploração Espacial Ganha Prêmio Internacional','Produção cinematográfica emociona espectadores ao explorar missões históricas e o futuro da humanidade além da Terra.','\n        <p>O documentário \"Horizontes Cósmicos\" foi aclamado internacionalmente, recebendo o prêmio de melhor produção científica em um festival renomado. A obra cinematográfica cativou espectadores ao narrar a história da exploração espacial, desde as missões pioneiras até as projeções para o futuro da humanidade em outros planetas, utilizando imagens impressionantes e entrevistas exclusivas com astronautas e cientistas.</p>\n        <p>Além de seu valor artístico, o documentário desempenha um papel crucial ao despertar o interesse do público pela ciência espacial e pela importância da pesquisa e da cooperação internacional para o avanço do conhecimento. Ele inspira uma nova geração a olhar para as estrelas e questionar os limites do possível.</p>\n        <p>Com o reconhecimento internacional, \"Horizontes Cósmicos\" será distribuído globalmente por grandes plataformas de streaming, tornando-se acessível a milhões de pessoas. A expectativa é que o filme não apenas entretenha, mas também fomente novos projetos educacionais e inspire mais investimentos na área da exploração espacial.</p>\n      ','Entretenimento','/images/Entretenimento2.jpg','2025-03-11','NewsStream',0,NULL,NULL,0),(18,'Tribunal Internacional Define Novas Regras para Crimes Digitais','Regulamentação inédita visa combater fraudes virtuais e garantir mais segurança para cidadãos online.','\n        <p>Representantes de diversos países se reuniram em um Tribunal Internacional para aprovar um tratado global que estabelece novas diretrizes para o combate a crimes cibernéticos. A regulamentação inédita visa criar um arcabouço legal mais robusto para lidar com fraudes virtuais, roubo de dados, ataques cibernéticos e outras ameaças que se alastram no ambiente online.</p>\n        <p>A importância dessa medida é crucial para proteger cidadãos e empresas em um mundo cada vez mais conectado. O tratado busca promover a cooperação entre nações para rastrear e punir criminosos digitais, garantindo mais segurança e confiança nas transações e interações online.</p>\n        <p>Os países signatários iniciarão agora o processo de adaptação de suas legislações nacionais para incorporar as novas regras. Além disso, a iniciativa prevê um aumento na cooperação entre agências de segurança internacionais para a troca de informações e o desenvolvimento de estratégias conjuntas no combate à criminalidade cibernética.</p>\n      ','Justiça','/images/Justica2.jpg','2025-02-05','NewsStream',0,NULL,NULL,0),(19,'Campeonato Mundial de eSports Tem Recorde de Público e Premiação Histórica','Milhões de espectadores acompanham partidas e atletas digitais disputam premiações milionárias.','\n        <p>O cenário de eSports atingiu um novo patamar com o Campeonato Mundial deste ano, que registrou um recorde de público e uma premiação histórica. Milhões de espectadores acompanharam as emocionantes partidas online e presencialmente, consolidando os esportes eletrônicos como um fenômeno cultural e um setor econômico em franca expansão.</p>\n        <p>A magnitude do evento, com atletas digitais disputando premiações milionárias, demonstra a profissionalização e o reconhecimento dos eSports em escala global. A audiência superou a de muitos eventos esportivos tradicionais, atraindo grandes patrocinadores e investimentos significativos na indústria.</p>\n        <p>O sucesso do Campeonato Mundial deve impulsionar ainda mais o surgimento de novas ligas, torneios e equipes profissionais. A expectativa é que o investimento continue crescendo, fortalecendo a infraestrutura para atletas, transmissões ao vivo e comunidades de fãs em todo o mundo, consolidando os eSports como parte integrante do entretenimento moderno.</p>\n      ','Jogos','/images/Jogos1.jpg','2025-03-09','NewsStream',0,NULL,NULL,0),(20,'Países Intensificam Esforços Para Proteger Florestas Tropicais','Novos acordos internacionais buscam frear o desmatamento e preservar a biodiversidade das florestas tropicais.','\n          <p>Líderes de diversas nações assinaram um acordo crucial para fortalecer políticas de conservação e combater o desmatamento nas principais florestas tropicais do mundo, como a Amazônia, o Congo e as florestas do Sudeste Asiático. A iniciativa inclui investimentos em fiscalização, tecnologias de monitoramento e apoio a comunidades locais para o desenvolvimento de práticas sustentáveis.</p>\n          <p>A proteção das florestas tropicais é vital para o equilíbrio climático do planeta, atuando como grandes sumidouros de carbono e abrigando uma biodiversidade inestimável. A intensificação dos esforços internacionais reflete a urgência em conter a perda de biomas essenciais para a saúde do ecossistema global.</p>\n          <p>Os países signatários se comprometeram a reduzir drasticamente as taxas de desmatamento até 2030, com metas ambiciosas e o desenvolvimento de planos de ação detalhados. A cooperação entre governos, organizações não governamentais e setor privado será fundamental para o sucesso dessas medidas e para garantir um futuro mais verde.</p>\n        ','Meio Ambiente','/images/Meio-ambiente2.jpg','2025-04-08','NewsStream',0,NULL,NULL,0),(21,'Telescópio Espacial Detecta Planeta Com Condições Semelhantes à Terra','Astrônomos analisam atmosfera de exoplaneta que pode abrigar vida.','\n          <p>O mais recente telescópio espacial, de última geração, realizou uma descoberta extraordinária: a detecção de um exoplaneta localizado em uma zona habitável de sua estrela, apresentando condições atmosféricas e climáticas notavelmente semelhantes às da Terra. A análise inicial sugere a presença de água e de elementos essenciais para a vida.</p>\n          <p>Essa revelação representa um marco na busca por vida extraterrestre, reforçando a possibilidade de que nosso universo seja vasto e repleto de planetas capazes de abrigar organismos vivos. A descoberta impulsiona novas linhas de pesquisa e reacende o fascínio pela exploração cósmica e pela nossa posição no universo.</p>\n          <p>Missões futuras, com equipamentos ainda mais sofisticados, estão sendo planejadas para estudar o exoplaneta em maior detalhe. Cientistas esperam coletar dados mais precisos sobre sua composição e, quem sabe, encontrar sinais diretos de atividade biológica, o que revolucionaria nossa compreensão sobre a vida no cosmos.</p>\n        ','Ciência','/images/Ciencia1.jpg','2025-04-25','NewsStream',0,NULL,NULL,0),(22,'Museu Nacional Reabre Com Exposição Sobre Civilizações Antigas','Visitantes podem explorar artefatos históricos restaurados após incêndio que devastou o acervo.','\n          <p>Após anos de um árduo processo de reconstrução e restauração, o Museu Nacional reabriu suas portas ao público com uma nova e impactante exposição dedicada às civilizações antigas do mundo. O incêndio que devastou parte de seu acervo em 2018 deixou uma ferida na memória cultural do país, mas a reabertura simboliza a resiliência e o compromisso com a preservação da história.</p>\n          <p>A exposição apresenta artefatos históricos cuidadosamente restaurados e peças inéditas, convidando os visitantes a uma viagem no tempo para explorar as culturas e os legados de povos ancestrais. Este evento é de suma importância para a recuperação de um patrimônio cultural e científico inestimável, reafirmando o papel do museu como um centro de conhecimento e aprendizado.</p>\n          <p>Novas exposições temáticas e projetos educativos estão programados para o futuro, visando fortalecer o engajamento da sociedade com a história, a ciência e a cultura. A reabertura do Museu Nacional é um convite para que as novas gerações se reconectem com o passado e inspirem-se na riqueza do conhecimento humano.</p>\n        ','Cultura','/images/Cultura1.jpg','2025-03-22','NewsStream',1,'Outro','Notícia desnecessária',0),(23,'Operação Contra Cibercrimes Identifica Rede de Fraudes Online','Equipes especializadas desmantelam grupo responsável por golpes financeiros na internet.','\n          <p>Uma operação policial conjunta de larga escala, envolvendo forças de segurança de diversos estados, resultou na identificação e desmantelamento de uma complexa rede nacional de cibercrimes. O grupo criminoso era especializado em golpes financeiros online, incluindo fraudes bancárias, clonagem de cartões e extorsões virtuais, causando prejuízos milionários a milhares de vítimas.</p>\n          <p>A ação reforça a crescente importância do combate ao crime digital, que tem se tornado uma ameaça cada vez mais sofisticada. A colaboração entre diferentes agências e a expertise em tecnologia forense foram cruciais para o sucesso da operação, protegendo os cidadãos de novas fraudes e recuperando ativos ilícitos.</p>\n          <p>As investigações continuam para identificar possíveis conexões internacionais da rede criminosa e localizar outras vítimas em potencial. As autoridades alertam para a necessidade de medidas preventivas de segurança online e prometem intensificar as ações para garantir um ambiente digital mais seguro para todos.</p>\n        ','Segurança Pública','/images/Seguranca1.jpg','2025-04-11','NewsStream',0,NULL,NULL,0),(24,'Destinos Sustentáveis Ganham Popularidade Entre Viajantes em 2025','Turismo ecológico cresce com foco em preservação e impacto ambiental reduzido.','\n          <p>Relatórios recentes de agências de viagem e plataformas de reservas apontam um aumento expressivo na procura por destinos sustentáveis e experiências de ecoturismo para o ano de 2025. Viajantes de todas as idades estão demonstrando maior consciência ambiental e preferindo roteiros que valorizam a preservação da natureza e o desenvolvimento local.</p>\n          <p>O crescimento do turismo sustentável é um reflexo da mudança de mentalidade global em relação ao impacto das viagens. Essa modalidade não apenas preserva recursos naturais e culturais, mas também beneficia diretamente as comunidades locais, gerando renda e promovendo o respeito à diversidade cultural e biológica.</p>\n          <p>Governos e empresas do setor turístico estão respondendo a essa demanda, investindo em infraestrutura ecológica, certificações de sustentabilidade e campanhas de conscientização para atrair viajantes responsáveis. A tendência é que o turismo se torne cada vez mais uma ferramenta para a conservação e o desenvolvimento comunitário.</p>\n        ','Turismo','/images/Turismo1.jpg','2025-04-04','NewsStream',0,NULL,NULL,0),(25,'Estilistas Apresentam Tendências Tecnológicas Para Roupas Inteligentes','Novos tecidos interativos podem mudar a maneira como as pessoas se vestem no dia a dia.','\n          <p>Durante a prestigiada semana de moda de Paris, estilistas renomados apresentaram coleções que revolucionam o conceito de vestuário, incorporando tendências tecnológicas avançadas. O destaque foram as \'roupas inteligentes\', confeccionadas com novos tecidos interativos que podem, por exemplo, regular a temperatura corporal, monitorar dados de saúde e até mesmo se conectar via Bluetooth a outros dispositivos.</p>\n          <p>Essas inovações prometem transformar a maneira como as pessoas se vestem no dia a dia, unindo funcionalidade e estilo de uma forma inédita. A moda, que antes se limitava à estética, agora se expande para áreas como esportes (com roupas que otimizam o desempenho), saúde (com monitoramento constante) e bem-estar, oferecendo uma experiência de uso muito mais completa.</p>\n          <p>A expectativa é que essas roupas inteligentes ganhem espaço no mercado de consumo até o final de 2025, tornando-se mais acessíveis e integrando-se à rotina das pessoas. A indústria da moda está se adaptando rapidamente às novas tecnologias, criando um futuro onde o vestuário não será apenas sobre o que se veste, mas também sobre o que ele pode fazer por você.</p>\n        ','Moda','/images/Moda1.jpg','2025-02-10','NewsStream',0,NULL,NULL,0),(27,'Nova Geração de Consoles Chega ao Mercado Com Gráficos Ultra-Realistas','Processadores potentes elevam a experiência dos jogadores a um novo patamar de imersão.','\n          <p>As principais fabricantes de consoles de videogame lançaram no mercado seus modelos de nova geração, prometendo uma experiência de jogo sem precedentes. Equipados com processadores gráficos (GPUs) dedicados e suporte à tecnologia de ray tracing em tempo real, os novos consoles oferecem gráficos ultra-realistas, com iluminação, sombras e reflexos que simulam o mundo real de forma impressionante.</p>\n          <p>Este salto tecnológico eleva a experiência dos jogadores a um novo patamar de imersão, tornando os ambientes virtuais mais críveis e detalhados. A capacidade de processamento dos novos consoles também permite mundos de jogo mais complexos, inteligência artificial mais sofisticada e taxas de quadros por segundo mais fluidas, resultando em uma jogabilidade superior.</p>\n          <p>Desenvolvedores de jogos de todo o mundo já estão lançando títulos otimizados para essa nova geração, explorando ao máximo o potencial gráfico e de desempenho. A expectativa é que, nos próximos anos, vejamos uma revolução no design de jogos, com experiências cada vez mais cinematográficas e interativas.</p>\n        ','Jogos','/images/Jogos2.jpg','2025-04-12','NewsStream',0,NULL,NULL,0),(28,'Governo Lança Programa de Bolsas Para Estudantes de Baixa Renda','Iniciativa busca ampliar acesso ao ensino superior por meio de financiamentos educacionais.','\n          <p>O governo federal anunciou o lançamento de um novo e abrangente programa de bolsas de estudo, destinado a estudantes de baixa renda que buscam acesso ao ensino superior. A iniciativa visa conceder bolsas integrais e parciais para ingresso em universidades públicas e privadas, democratizando o acesso à educação de qualidade e promovendo a inclusão social.</p>\n          <p>Essa ação é de fundamental importância para reduzir as desigualdades educacionais no país, oferecendo oportunidades para jovens talentos que, de outra forma, não teriam condições de cursar uma faculdade. O investimento em educação é visto como um pilar essencial para o desenvolvimento social e econômico a longo prazo.</p>\n          <p>As inscrições para o programa serão abertas em breve, com critérios que considerarão tanto o desempenho acadêmico dos estudantes quanto sua situação de vulnerabilidade social. A expectativa é que o programa beneficie milhares de jovens em todo o país, transformando vidas e construindo um futuro com mais oportunidades para todos.</p>\n        ','Educação','/images/Educacao2.jpg','2025-01-01','NewsStream',0,NULL,NULL,0),(29,'Cientistas Descobrem Nova Forma de Vida em Profundezas Oceânicas','Espécie recém-identificada pode fornecer pistas sobre evolução em ambientes extremos.','\n          <p>Uma missão submarina de pesquisa científica fez uma descoberta extraordinária nas profundezas do oceano Pacífico: uma nova e completamente desconhecida forma de vida. A espécie, que se adapta a ambientes extremos sem luz solar e com alta pressão, oferece pistas valiosas sobre a evolução da vida em condições adversas.</p>\n          <p>O achado é de grande relevância para a biologia marinha e a astrobiologia, pois nos ajuda a entender como a vida pode surgir e persistir em ambientes hostis, tanto na Terra quanto em outros corpos celestes. A biodiversidade dos oceanos ainda guarda muitos segredos, e cada nova descoberta expande nosso conhecimento sobre o planeta.</p>\n          <p>Cientistas agora se debruçam sobre o estudo dessa criatura, com planos de sequenciar seu genoma para desvendar suas adaptações genéticas e processos metabólicos únicos. A pesquisa pode ter implicações para o desenvolvimento de novas tecnologias e para a compreensão da habitabilidade de outros planetas em nosso sistema solar e além.</p>\n        ','Ciência','/images/Ciencia2.jpg','2025-02-19','NewsStream',0,NULL,NULL,0),(30,'Festival Literário Internacional Destaca Novos Autores Brasileiros','Evento reúne escritores emergentes e consagrados para debates e lançamentos de livros.','\n          <p>O prestigiado Festival Literário Internacional de 2025 dedicou uma parte significativa de sua programação a destacar a nova geração de autores brasileiros. O evento reuniu escritores emergentes e consagrados em uma série de debates, mesas-redondas e sessões de autógrafos, celebrando a riqueza e a diversidade da literatura nacional.</p>\n          <p>O festival desempenha um papel crucial ao promover a leitura, incentivar a produção literária e dar visibilidade a talentos que estão despontando no cenário nacional. A oportunidade de interagir com o público e com outros escritores é invaluable para o desenvolvimento e reconhecimento desses novos autores.</p>\n          <p>Além da programação intensa, o evento também impulsionou a venda de livros e a troca cultural. Muitos dos autores premiados e destacados no festival ganharam visibilidade internacional, resultando em novos contratos com editoras estrangeiras e a expansão da literatura brasileira para outros mercados.</p>\n        ','Cultura','/images/Cultura2.jpg','2025-02-12','NewsStream',0,NULL,NULL,0),(31,'Nova Tecnologia de Reconhecimento Facial Será Implementada em Aeroportos','Sistema promete aumentar a segurança e agilizar processos de imigração e embarque.','\n          <p>Autoridades de segurança aeroportuária confirmaram a implementação de uma nova e avançada tecnologia de reconhecimento facial nos principais aeroportos do país. O sistema, que utiliza inteligência artificial e câmeras de alta precisão, visa aumentar a segurança nas áreas restritas e agilizar significativamente os processos de imigração e embarque de passageiros.</p>\n          <p>A adoção dessa tecnologia é vista como um passo importante para modernizar a infraestrutura de segurança e responder às crescentes demandas por eficiência e controle. A expectativa é que o reconhecimento facial reduza filas, previna fraudes de identidade e garanta um controle mais rigoroso sobre o fluxo de pessoas, tornando as viagens aéreas mais seguras e fluidas.</p>\n          <p>O sistema será inicialmente testado em cinco aeroportos-piloto antes de ser expandido para toda a rede nacional. A iniciativa gerou debates sobre privacidade de dados, mas as autoridades garantem que todas as medidas de proteção e conformidade legal estão sendo tomadas para salvaguardar as informações dos cidadãos.</p>\n        ','Segurança Pública','/images/Seguranca2.jpg','2025-03-20','NewsStream',0,NULL,NULL,1),(32,'Empresas de Aviação Testam Voos Comerciais Com Combustível Sustentável','Iniciativa pode reduzir emissões de carbono no setor e transformar o futuro das viagens aéreas.','\n          <p>Companhias aéreas de ponta iniciaram testes de voos comerciais utilizando Combustível Sustentável de Aviação (SAF), derivado de biomassa e resíduos orgânicos. Essa iniciativa é um marco na busca por reduzir as emissões de carbono do setor aéreo, um dos mais desafiadores em termos de descarbonização.</p>\n          <p>A aviação é responsável por uma parcela significativa das emissões globais de gases de efeito estufa. A aposta no SAF busca tornar o setor mais verde e alinhado com as metas climáticas globais, oferecendo uma alternativa mais ecológica aos combustíveis fósseis tradicionais. O sucesso desses testes é crucial para o futuro das viagens aéreas.</p>\n          <p>Se os resultados dos testes forem positivos e a produção de SAF se tornar economicamente viável em larga escala, a substituição parcial de combustíveis fósseis poderá começar já em 2026. Essa transição não apenas beneficiará o meio ambiente, mas também posicionará a indústria da aviação na vanguarda da sustentabilidade global.</p>\n        ','Turismo','/images/Turismo2.jpg','2025-04-16','NewsStream',0,NULL,NULL,0),(33,'Inteligência Artificial Revoluciona o Design de Roupas Personalizadas','Novos algoritmos permitem a criação de peças sob medida com base no estilo e preferências de cada consumidor.','\n          <p>O setor da moda está passando por uma revolução impulsionada pela Inteligência Artificial. Novas plataformas de design e produção estão utilizando algoritmos avançados para permitir a criação de peças de roupa verdadeiramente personalizadas, sob medida para o estilo, as preferências e até mesmo o biotipo de cada consumidor.</p>\n          <p>Esse recurso democratiza o acesso à moda sob medida, que antes era restrita à alta-costura. Além de oferecer exclusividade, a produção sob demanda, guiada por IA, pode reduzir significativamente o desperdício na indústria têxtil, que é uma das mais poluentes do mundo. A sustentabilidade e a personalização caminham lado a lado nessa nova era da moda.</p>\n          <p>Grandes marcas já estão de olho nesse modelo e pretendem adotá-lo nos próximos lançamentos comerciais, transformando a cadeia de valor da moda. A expectativa é que, em breve, comprar uma roupa seja uma experiência totalmente nova, onde o consumidor participa ativamente da criação de suas peças favoritas.</p>\n        ','Moda','/images/Moda2.jpg','2025-01-25','NewsStream',0,NULL,NULL,0),(34,'Carros Voadores Começam Testes Para Uso Urbano','Tecnologia promissora busca reduzir congestionamentos e oferecer alternativas de transporte aéreo acessível.','\n          <p>O sonho dos carros voadores está mais perto de se tornar realidade. Empresas de tecnologia e mobilidade iniciaram os primeiros voos de teste com veículos elétricos de decolagem e pouso vertical (eVTOLs), popularmente conhecidos como \"carros voadores\", em áreas urbanas controladas. O objetivo é avaliar a segurança, a viabilidade e a integração desses veículos no tráfego aéreo das cidades.</p>\n          <p>A tecnologia promete revolucionar a mobilidade urbana, oferecendo uma alternativa para reduzir os severos congestionamentos nas grandes metrópoles. A ideia é que, em um futuro próximo, esses veículos proporcionem um transporte aéreo acessível e eficiente, encurtando distâncias e otimizando o tempo de deslocamento.</p>\n          <p>As aeronaves ainda aguardam a aprovação de órgãos reguladores de aviação em diversos países para que possam operar comercialmente, o que é esperado para 2027. A corrida pelo desenvolvimento de carros voadores está aquecida, e a expectativa é que eles transformem radicalmente o conceito de transporte pessoal e público nas próximas décadas.</p>\n        ','Automóveis','/images/Automoveis2.jpg','2025-04-22','NewsStream',0,NULL,NULL,1);
/*!40000 ALTER TABLE `noticias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notificacoes`
--

DROP TABLE IF EXISTS `notificacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notificacoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `tipo_notificacao` varchar(50) NOT NULL,
  `mensagem` text NOT NULL,
  `link` varchar(255) DEFAULT NULL,
  `data_criacao` datetime DEFAULT current_timestamp(),
  `lida` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `notificacoes_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificacoes`
--

LOCK TABLES `notificacoes` WRITE;
/*!40000 ALTER TABLE `notificacoes` DISABLE KEYS */;
INSERT INTO `notificacoes` VALUES (5,123,'denuncia_comentario_retirada','A denúncia do seu comentário \"Campeões!!!...\" foi retirada.','/noticias/2','2025-07-02 01:34:32',1),(6,125,'comentario_denunciado','Seu comentário \"Notícia interessante...\" foi denunciado.','/noticias/6','2025-07-02 01:47:53',0);
/*!40000 ALTER TABLE `notificacoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (123,'Gabriel','gabriel@gmail.com','123',1),(124,'admin','admin@newsstream.com','123',1),(125,'Anttonio','anttonio@gmail.com','123',0),(126,'Paula','paula@gmail.com','123',0),(127,'Leonardo','leo@gmail.com','123',0);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `view_noticias_engajamento`
--

DROP TABLE IF EXISTS `view_noticias_engajamento`;
/*!50001 DROP VIEW IF EXISTS `view_noticias_engajamento`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `view_noticias_engajamento` AS SELECT
 1 AS `noticia_id`,
  1 AS `titulo`,
  1 AS `categoria`,
  1 AS `data_publicacao`,
  1 AS `autor`,
  1 AS `total_comentarios`,
  1 AS `total_curtidas` */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `view_usuarios_categorias_seguidas`
--

DROP TABLE IF EXISTS `view_usuarios_categorias_seguidas`;
/*!50001 DROP VIEW IF EXISTS `view_usuarios_categorias_seguidas`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `view_usuarios_categorias_seguidas` AS SELECT
 1 AS `usuario_id`,
  1 AS `nome_usuario`,
  1 AS `email_usuario`,
  1 AS `categoria_seguida`,
  1 AS `data_seguida` */;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `view_noticias_engajamento`
--

/*!50001 DROP VIEW IF EXISTS `view_noticias_engajamento`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_noticias_engajamento` AS select `n`.`id` AS `noticia_id`,`n`.`titulo` AS `titulo`,`n`.`categoria` AS `categoria`,`n`.`data_publicacao` AS `data_publicacao`,`n`.`autor` AS `autor`,count(distinct `c`.`id`) AS `total_comentarios`,count(distinct `cu`.`id`) AS `total_curtidas` from ((`noticias` `n` left join `comentarios` `c` on(`n`.`id` = `c`.`noticia_id` and `c`.`denunciado` = 0)) left join `curtidas` `cu` on(`n`.`id` = `cu`.`noticia_id`)) group by `n`.`id`,`n`.`titulo`,`n`.`categoria`,`n`.`data_publicacao`,`n`.`autor` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `view_usuarios_categorias_seguidas`
--

/*!50001 DROP VIEW IF EXISTS `view_usuarios_categorias_seguidas`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_usuarios_categorias_seguidas` AS select `u`.`id` AS `usuario_id`,`u`.`nome` AS `nome_usuario`,`u`.`email` AS `email_usuario`,`cat`.`nome` AS `categoria_seguida`,`cs`.`data_seguida` AS `data_seguida` from ((`usuarios` `u` join `categorias_seguidas` `cs` on(`u`.`id` = `cs`.`usuario_id`)) join `categorias` `cat` on(`cs`.`categoria_id` = `cat`.`id`)) order by `u`.`nome`,`cs`.`data_seguida` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-03 23:11:48
