const todasNoticias = [
    {
      id: 1,
      categoria: 'Política',
      titulo: 'Congresso Aprova Reforma Tributária Após Semanas de Debate',
      resumo: 'Governo unifica impostos, cria cashback para famílias de baixa renda e promete simplificação no sistema tributário.',
      imagemUrl: '/images/Politicaa.jpg',
      conteudo: `
        <p>A aprovação da Reforma Tributária no Congresso Nacional marca o fim de um período de intensos debates e negociações. A proposta tem como principal objetivo simplificar o complexo sistema tributário brasileiro, substituindo múltiplos impostos por um modelo unificado. Isso deve desburocratizar as operações para empresas e cidadãos.</p>
        <p>Um dos pontos mais celebrados da reforma é a criação do mecanismo de cashback para famílias de baixa renda, que visa tornar a tributação mais justa, devolvendo parte dos impostos pagos. A expectativa é que essa medida beneficie milhões de brasileiros, aumentando o poder de compra e reduzindo a desigualdade social.</p>
        <p>A nova legislação segue agora para sanção presidencial e será implementada de forma gradual nos próximos anos. Especialistas preveem que a reforma pode impulsionar o crescimento econômico e atrair novos investimentos para o país, gerando mais empregos e renda. Resta acompanhar a aplicação prática e seus efeitos a longo prazo.</p>
      `
    },
    {
      id: 2,
      categoria: 'Esportes',
      titulo: 'União FC Conquista Campeonato Nacional em Final Histórica',
      resumo: 'Em uma virada nos minutos finais, o time quebra um jejum de 15 anos e faz história no futebol nacional.',
      imagemUrl: '/images/Trofeu.jpg',
      conteudo: `
        <p>O União FC protagonizou uma das finais mais emocionantes do Campeonato Nacional, conquistando o título com uma virada eletrizante nos últimos minutos do segundo tempo. A torcida, que lotou o estádio, celebrou intensamente o fim de um jejum de 15 anos sem grandes conquistas.</p>
        <p>Este título não é apenas uma vitória esportiva; ele reacende o orgulho de uma comunidade inteira e solidifica o retorno do União FC à elite do futebol brasileiro, garantindo sua participação em competições internacionais. O time demonstrou garra, resiliência e um trabalho em equipe impecável.</p>
        <p>Com a taça na mão, a diretoria do clube já sinalizou planos de investimento em novos talentos e infraestrutura, visando manter o alto nível de desempenho nas próximas temporadas. A cidade está em festa, e os jogadores são agora lendas para a nova geração de torcedores.</p>
      `
    },
    {
      id: 3,
      categoria: 'Política',
      titulo: 'Reforma Eleitoral Entra em Debate no Congresso',
      resumo: 'Senadores analisam novas regras para financiamento de campanhas e transparência nas eleições.',
      imagemUrl: '/images/Politica2.jpg',
      conteudo: `
        <p>O Senado Federal deu início aos debates sobre uma nova proposta de reforma eleitoral, que busca modernizar e tornar mais transparentes as regras para as eleições no Brasil. Entre os pontos centrais, estão a discussão sobre o financiamento de campanhas, os limites para doações e a fiscalização da prestação de contas.</p>
        <p>A importância desta reforma reside na necessidade de garantir eleições mais justas e equitativas, combatendo o abuso do poder econômico e a disseminação de desinformação. O objetivo é fortalecer a democracia e aumentar a confiança dos eleitores no processo eleitoral.</p>
        <p>As discussões prometem ser intensas nas próximas semanas, com a participação de parlamentares, juristas e representantes da sociedade civil. Se aprovada, a reforma poderá ter um impacto significativo nas próximas eleições, alterando a dinâmica das campanhas e a forma como os candidatos se relacionam com o eleitorado.</p>
      `
    },
    {
      id: 4,
      categoria: 'Tecnologia',
      titulo: 'Cientistas Revelam Avanço Revolucionário em Inteligência Artificial',
      resumo: 'Novo modelo de IA promete simular raciocínio humano com precisão nunca vista antes.',
      imagemUrl: '/images/Tecnologia.jpg',
      conteudo: `
        <p>Pesquisadores de um laboratório de ponta anunciaram um avanço notável no campo da Inteligência Artificial. Eles desenvolveram um novo modelo de IA capaz de simular processos de raciocínio humano com uma precisão sem precedentes, aprendendo e adaptando-se a situações complexas de forma autônoma.</p>
        <p>As implicações dessa tecnologia são vastas e podem transformar diversas áreas, desde a medicina, com a criação de assistentes de diagnóstico mais eficientes, até a educação, com plataformas de aprendizado personalizadas. A capacidade de simular o raciocínio humano abre portas para soluções inovadoras em problemas que antes pareciam intransponíveis.</p>
        <p>Atualmente, o modelo está em fase de testes controlados e deve ser aplicado primeiramente em sistemas educacionais e assistentes médicos, com a expectativa de expandir para outras aplicações em breve. A comunidade científica está eufórica com o potencial dessa descoberta para o futuro da tecnologia.</p>
      `
    },
    {
      id: 5,
      categoria: 'Esportes',
      titulo: 'Seleção Brasileira Inicia Preparação Para a Copa do Mundo',
      resumo: 'Técnico divulga convocação com surpresas e aposta em jovens talentos.',
      imagemUrl: '/images/Selecao.jpg',
      conteudo: `
        <p>A Seleção Brasileira deu o pontapé inicial em sua preparação para a próxima Copa do Mundo. O técnico, em coletiva de imprensa, divulgou a lista de convocados, que trouxe algumas surpresas e uma aposta clara em jovens talentos que se destacaram recentemente em seus clubes. Veteranos renomados acabaram ficando de fora, sinalizando uma renovação no elenco.</p>
        <p>Essa convocação reflete uma nova filosofia de jogo, buscando mais velocidade, dinamismo e uma abordagem tática inovadora. A decisão do técnico gerou debate entre torcedores e comentaristas, mas a maioria se mostra otimista com o potencial do novo grupo de jogadores.</p>
        <p>Os treinamentos intensivos começarão na próxima semana em Teresópolis, seguidos por uma série de amistosos preparatórios agendados para o mês de junho, antes do início da competição. A expectativa é que a equipe chegue à Copa do Mundo com entrosamento e força máxima para brigar pelo título.</p>
      `
    },
    {
      id: 6,
      categoria: 'Negócios',
      titulo: 'Mercado Financeiro Fecha em Alta Após Anúncio de Taxas de Juros',
      resumo: 'Índice econômico sobe 2% com expectativa de crescimento acelerado.',
      imagemUrl: '/images/Negocios.jpg',
      conteudo: `
        <p>O mercado financeiro brasileiro registrou alta expressiva nesta sexta-feira, reagindo positivamente ao anúncio do Banco Central de manutenção das taxas de juros. O índice Ibovespa, principal indicador da bolsa de valores, subiu 2%, refletindo o otimismo dos investidores com a estabilidade econômica.</p>
        <p>A decisão do Banco Central foi interpretada como um sinal de confiança na trajetória de controle da inflação e de estímulo ao crescimento. Essa estabilidade é crucial para atrair investimentos e gerar um ambiente favorável aos negócios, impactando positivamente diversos setores da economia.</p>
        <p>Analistas do mercado preveem que a manutenção das taxas de juros, aliada a outras medidas governamentais, pode gerar novas oportunidades de investimento e impulsionar o crescimento de setores como varejo, construção civil e tecnologia nos próximos meses. A expectativa é de um cenário econômico mais aquecido.</p>
      `
    },
    {
      id: 7,
      categoria: 'Meio Ambiente',
      titulo: 'Projeto Global de Energia Limpa Recebe Financiamento Bilionário',
      resumo: 'Países firmam parceria para expandir uso de fontes renováveis e reduzir emissões.',
      imagemUrl: '/images/Meio-ambiente.jpg',
      conteudo: `
        <p>Líderes de diversas nações firmaram um acordo histórico para financiar um ambicioso projeto global de energia limpa. O investimento, que soma bilhões de dólares, será direcionado para o desenvolvimento e expansão de fontes de energia renovável, com foco em tecnologias solar, eólica e hidrogênio verde.</p>
        <p>Esta iniciativa é vista como um marco fundamental no combate às mudanças climáticas, pois visa acelerar a transição energética global e reduzir significativamente as emissões de gases de efeito estufa. Além do impacto ambiental, espera-se que o projeto gere milhões de "empregos verdes" e impulsione a inovação tecnológica.</p>
        <p>Os primeiros projetos piloto devem ser implementados em países em desenvolvimento ainda este ano, com o objetivo de criar modelos replicáveis em larga escala. A cooperação internacional demonstra um compromisso renovado em construir um futuro mais sustentável e energeticamente eficiente para todos.</p>
      `
    },
    {
      id: 8,
      categoria: 'Saúde',
      titulo: 'Novos Estudos Mostram Avanço Promissor no Tratamento do Câncer',
      resumo: 'Pesquisadores desenvolvem terapia inovadora que aumenta taxas de recuperação em pacientes com tumores agressivos.',
      imagemUrl: '/images/Saude.jpg',
      conteudo: `
        <p>Estudos recentes apresentaram resultados animadores no campo da oncologia, revelando uma nova abordagem terapêutica para o tratamento de tipos agressivos de câncer. A pesquisa, que combinou técnicas de engenharia genética com imunoterapia, demonstrou um aumento significativo nas taxas de recuperação de pacientes.</p>
        <p>A importância dessa descoberta é imensa, pois ela pode oferecer uma nova perspectiva e esperança para milhares de pacientes que enfrentam tumores de difícil tratamento. Além disso, a metodologia utilizada abre caminho para o desenvolvimento de tratamentos personalizados, adaptados às características genéticas de cada paciente e de seu tumor.</p>
        <p>Atualmente, os ensaios clínicos estão em fase avançada, e se os resultados continuarem promissores, a nova terapia poderá receber aprovação regulatória nos próximos anos, tornando-se uma ferramenta poderosa na luta contra o câncer. A comunidade médica e científica está otimista com o potencial transformador dessa inovação.</p>
      `
    },
    {
      id: 9,
      categoria: 'Entretenimento',
      titulo: 'Filme de Ficção Científica Bate Recorde de Bilheteria Global',
      resumo: 'Produção arrecada mais de 1 bilhão de dólares e conquista fãs com sua trama envolvente e efeitos visuais revolucionários.',
      imagemUrl: '/images/Entretenimento.jpg',
      conteudo: `
        <p>Um novo blockbuster de ficção científica conquistou os cinemas ao redor do mundo, quebrando recordes de bilheteria e superando a marca de 1 bilhão de dólares em menos de um mês de exibição. O filme, aclamado pela crítica e pelo público, se destaca por sua trama envolvente, personagens cativantes e efeitos visuais que redefinem os padrões da indústria.</p>
        <p>O sucesso estrondoso não apenas reforça o apelo duradouro do gênero de ficção científica, mas também demonstra o poder das grandes produções cinematográficas em atrair e engajar espectadores globalmente. A obra movimentou a indústria do entretenimento e reacendeu o debate sobre o futuro do cinema.</p>
        <p>Diante da recepção massiva, a produtora já anunciou que a sequência do filme está em fase de pré-produção, prometendo expandir ainda mais o universo narrativo e explorar novas fronteiras visuais. Fãs em todo o mundo aguardam ansiosamente por mais detalhes sobre os próximos capítulos dessa saga.</p>
      `
    },
    {
      id: 10,
      categoria: 'Justiça',
      titulo: 'Supremo Tribunal Decide Sobre Limites da Liberdade de Expressão Online',
      resumo: 'Decisão histórica define novas diretrizes para conteúdos publicados nas redes sociais.',
      imagemUrl: '/images/Justica1.jpg',
      conteudo: `
        <p>O Supremo Tribunal Federal (STF) proferiu uma decisão histórica que estabelece novas diretrizes para os limites da liberdade de expressão em plataformas online. A medida visa combater a disseminação de discursos de ódio, desinformação e conteúdos que incitem a violência, buscando um equilíbrio entre o direito individual à expressão e a responsabilidade social no ambiente digital.</p>
        <p>A importância dessa decisão reside na necessidade de adaptar a legislação às dinâmicas das redes sociais, que muitas vezes se tornam palco para abusos e ataques. A regulamentação busca garantir que as plataformas digitais tenham mecanismos mais eficazes para moderar conteúdos, sem que isso configure censura prévia.</p>
        <p>As plataformas terão um prazo determinado para se adequarem às novas exigências do STF, sob pena de sanções. A decisão gerou debates acalorados entre defensores da liberdade irrestrita e aqueles que pedem maior responsabilidade no ambiente digital, mas é um passo importante para a construção de um ambiente online mais seguro e ético.</p>
      `
    },
    {
      id: 11,
      categoria: 'Gastronomia',
      titulo: 'Chef Brasileira Ganha Estrela Michelin em Restaurante Sustentável',
      resumo: 'Reconhecimento internacional destaca culinária brasileira e uso consciente de ingredientes.',
      imagemUrl: '/images/Gastronomia1.jpg',
      conteudo: `
        <p>Uma chef brasileira conquistou uma prestigiada estrela Michelin para seu restaurante, que se destaca não apenas pela excelência culinária, mas também por sua filosofia de sustentabilidade. O reconhecimento internacional celebra a criatividade, a inovação e o compromisso com o uso consciente de ingredientes regionais e de pequenos produtores.</p>
        <p>Este prêmio é um marco para a gastronomia brasileira, elevando o patamar da culinária nacional no cenário mundial e mostrando que é possível unir alta gastronomia com práticas ambientalmente responsáveis. A valorização dos produtos locais e a redução do desperdício são pilares que tornaram o restaurante um exemplo a ser seguido.</p>
        <p>Com a estrela Michelin, o restaurante e a chef brasileira devem atrair um público ainda maior, impulsionando o turismo gastronômico no país e abrindo novas oportunidades para outros chefs que buscam trilhar o caminho da sustentabilidade na cozinha. É uma inspiração para toda a indústria.</p>
      `
    },
    {
      id: 12,
      categoria: 'Educação',
      titulo: 'Escolas Públicas Adotam Tecnologia 5G Para Aulas Interativas',
      resumo: 'Projeto piloto oferece conectividade de alta velocidade e melhora o desempenho de alunos.',
      imagemUrl: '/images/Educacao1.jpg',
      conteudo: `
        <p>Um projeto piloto inovador está implementando a tecnologia 5G em escolas públicas, revolucionando a forma como o aprendizado acontece. Com conectividade de alta velocidade, os alunos e professores agora podem acessar plataformas virtuais otimizadas, participar de aulas interativas e explorar recursos de realidade aumentada, tornando o processo educacional mais dinâmico e envolvente.</p>
        <p>A adoção do 5G no ambiente escolar é um passo significativo para a inclusão digital e a modernização do ensino público, reduzindo a lacuna tecnológica entre escolas de diferentes realidades socioeconômicas. A expectativa é que o acesso a ferramentas educacionais avançadas melhore o desempenho dos alunos e prepare-os melhor para os desafios do futuro.</p>
        <p>Se o projeto piloto demonstrar resultados positivos, a tecnologia 5G será expandida para toda a rede pública de ensino nos próximos anos, transformando o panorama da educação no país. Essa iniciativa promete abrir um leque de possibilidades para métodos de ensino mais personalizados e eficazes.</p>
      `
    },
    {
      id: 13,
      categoria: 'Tecnologia',
      titulo: 'Cientistas Criam Chip Neural Capaz de Interagir Diretamente com o Cérebro',
      resumo: 'Novo avanço pode permitir comunicação direta entre humanos e máquinas, revolucionando acessibilidade e produtividade.',
      imagemUrl: '/images/Tecnologia2.jpg',
      conteudo: `
        <p>Cientistas de um instituto de pesquisa de ponta anunciaram a criação de um chip neural inovador, capaz de estabelecer uma comunicação direta e bidirecional com o cérebro humano. Este avanço, que antes parecia restrito à ficção científica, permite interpretar sinais neurais em tempo real e até mesmo enviar estímulos de volta, abrindo portas para aplicações revolucionárias.</p>
        <p>As implicações dessa tecnologia são vastas, especialmente para a medicina. Ela pode transformar o tratamento de doenças neurológicas como Parkinson e Alzheimer, além de criar novas formas de comunicação e controle para pessoas com deficiências motoras, oferecendo um nível de acessibilidade e autonomia sem precedentes. A produtividade humana também pode ser impactada.</p>
        <p>Os primeiros testes clínicos com pacientes estão previstos para o próximo ano, com foco inicial em aplicações médicas e no desenvolvimento de dispositivos assistivos. A comunidade científica global está observando de perto, pois este chip neural pode redefinir nossa compreensão da mente humana e a forma como interagimos com a tecnologia.</p>
      `
    },
    {
      id: 14,
      categoria: 'Saúde',
      titulo: 'Terapia Genética Promete Cura Definitiva para Doença Rara',
      resumo: 'Pesquisa inovadora demonstra sucesso em reverter mutações genéticas que causam enfermidades hereditárias.',
      imagemUrl: '/images/Saude2.jpg',
      conteudo: `
        <p>Uma pesquisa inovadora no campo da genética demonstrou resultados promissores ao desenvolver uma terapia capaz de reverter mutações genéticas específicas, oferecendo uma potencial cura definitiva para uma doença rara e hereditária. Este avanço representa um marco significativo na medicina personalizada.</p>
        <p>A importância dessa descoberta é imensa, pois ela pode transformar a vida de milhares de pacientes que antes não tinham opções terapêuticas eficazes. Ao corrigir a causa-raiz genética da enfermidade, a terapia abre um novo caminho para o tratamento de diversas doenças genéticas, oferecendo a esperança de uma vida plena.</p>
        <p>Os resultados da pesquisa serão submetidos a agências reguladoras para validação e aprovação. Se confirmados em ensaios clínicos mais amplos, essa abordagem poderá ser aplicada em larga escala nos próximos anos, pavimentando o caminho para o desenvolvimento de terapias similares para outras condições genéticas complexas.</p>
      `
    },
    {
      id: 15,
      categoria: 'Negócios',
      titulo: 'Startups de Energia Renovável Recebem Investimento de US$ 5 Bilhões',
      resumo: 'Capital global é direcionado para inovação sustentável, buscando reduzir impacto ambiental e aumentar eficiência energética.',
      imagemUrl: '/images/Negocios2.jpg',
      conteudo: `
        <p>Um consórcio de investidores globais anunciou um aporte de US$ 5 bilhões em startups que atuam no setor de energia renovável. O capital será direcionado para empresas focadas em inovação em energia solar, eólica, hidrogênio verde e outras tecnologias limpas, com o objetivo de acelerar a transição para uma economia de baixo carbono.</p>
        <p>Este financiamento massivo é um reflexo do crescente reconhecimento da urgência em combater as mudanças climáticas e do potencial econômico das soluções sustentáveis. A injeção de capital permitirá que essas startups escalem suas operações, desenvolvam novas tecnologias e aumentem a eficiência energética em diversas indústrias.</p>
        <p>As empresas beneficiadas pelo investimento planejam iniciar testes-piloto e expandir suas capacidades industriais nos próximos 18 meses, com o objetivo de gerar um impacto ambiental positivo significativo e impulsionar o crescimento econômico sustentável em nível global. O setor de energia limpa promete ser um dos grandes motores de inovação.</p>
      `
    },
    {
      id: 16,
      categoria: 'Gastronomia',
      titulo: 'Inteligência Artificial Agora Cria Receitas Personalizadas Baseadas no Paladar',
      resumo: 'Restaurantes começam a usar tecnologia que analisa preferências individuais e sugere pratos sob medida para cada cliente.',
      imagemUrl: '/images/Gastronomia2.jpg',
      conteudo: `
        <p>O universo gastronômico está experimentando uma revolução com a introdução de sistemas de Inteligência Artificial capazes de criar receitas personalizadas. Restaurantes de ponta já estão adotando essa tecnologia, que analisa as preferências individuais dos clientes, restrições alimentares e até mesmo o histórico de consumo para sugerir pratos sob medida, oferecendo uma experiência culinária única e exclusiva.</p>
        <p>Essa inovação pode transformar a forma como as pessoas se alimentam, indo além do menu fixo e proporcionando refeições que se adaptam perfeitamente aos gostos e necessidades de cada indivíduo. Além de otimizar a satisfação do cliente, a IA pode ajudar na gestão de ingredientes e na redução do desperdício nas cozinhas.</p>
        <p>Empresas do setor de tecnologia alimentícia já planejam expandir o serviço para plataformas de delivery e para o mercado de alimentos prontos, permitindo que a personalização culinária chegue a um público ainda maior. O futuro da gastronomia promete ser cada vez mais inteligente e adaptado ao paladar de cada um.</p>
      `
    },
    {
      id: 17,
      categoria: 'Entretenimento',
      titulo: 'Novo Documentário Sobre Exploração Espacial Ganha Prêmio Internacional',
      resumo: 'Produção cinematográfica emociona espectadores ao explorar missões históricas e o futuro da humanidade além da Terra.',
      imagemUrl: '/images/Entretenimento2.jpg',
      conteudo: `
        <p>O documentário "Horizontes Cósmicos" foi aclamado internacionalmente, recebendo o prêmio de melhor produção científica em um festival renomado. A obra cinematográfica cativou espectadores ao narrar a história da exploração espacial, desde as missões pioneiras até as projeções para o futuro da humanidade em outros planetas, utilizando imagens impressionantes e entrevistas exclusivas com astronautas e cientistas.</p>
        <p>Além de seu valor artístico, o documentário desempenha um papel crucial ao despertar o interesse do público pela ciência espacial e pela importância da pesquisa e da cooperação internacional para o avanço do conhecimento. Ele inspira uma nova geração a olhar para as estrelas e questionar os limites do possível.</p>
        <p>Com o reconhecimento internacional, "Horizontes Cósmicos" será distribuído globalmente por grandes plataformas de streaming, tornando-se acessível a milhões de pessoas. A expectativa é que o filme não apenas entretenha, mas também fomente novos projetos educacionais e inspire mais investimentos na área da exploração espacial.</p>
      `
    },
    {
      id: 18,
      categoria: 'Justiça',
      titulo: 'Tribunal Internacional Define Novas Regras para Crimes Digitais',
      resumo: 'Regulamentação inédita visa combater fraudes virtuais e garantir mais segurança para cidadãos online.',
      imagemUrl: '/images/Justica2.jpg',
      conteudo: `
        <p>Representantes de diversos países se reuniram em um Tribunal Internacional para aprovar um tratado global que estabelece novas diretrizes para o combate a crimes cibernéticos. A regulamentação inédita visa criar um arcabouço legal mais robusto para lidar com fraudes virtuais, roubo de dados, ataques cibernéticos e outras ameaças que se alastram no ambiente online.</p>
        <p>A importância dessa medida é crucial para proteger cidadãos e empresas em um mundo cada vez mais conectado. O tratado busca promover a cooperação entre nações para rastrear e punir criminosos digitais, garantindo mais segurança e confiança nas transações e interações online.</p>
        <p>Os países signatários iniciarão agora o processo de adaptação de suas legislações nacionais para incorporar as novas regras. Além disso, a iniciativa prevê um aumento na cooperação entre agências de segurança internacionais para a troca de informações e o desenvolvimento de estratégias conjuntas no combate à criminalidade cibernética.</p>
      `
    },
    {
      id: 19,
      categoria: 'Jogos',
      titulo: 'Campeonato Mundial de eSports Tem Recorde de Público e Premiação Histórica',
      resumo: 'Milhões de espectadores acompanham partidas e atletas digitais disputam premiações milionárias.',
      imagemUrl: '/images/Jogos1.jpg',
      conteudo: `
        <p>O cenário de eSports atingiu um novo patamar com o Campeonato Mundial deste ano, que registrou um recorde de público e uma premiação histórica. Milhões de espectadores acompanharam as emocionantes partidas online e presencialmente, consolidando os esportes eletrônicos como um fenômeno cultural e um setor econômico em franca expansão.</p>
        <p>A magnitude do evento, com atletas digitais disputando premiações milionárias, demonstra a profissionalização e o reconhecimento dos eSports em escala global. A audiência superou a de muitos eventos esportivos tradicionais, atraindo grandes patrocinadores e investimentos significativos na indústria.</p>
        <p>O sucesso do Campeonato Mundial deve impulsionar ainda mais o surgimento de novas ligas, torneios e equipes profissionais. A expectativa é que o investimento continue crescendo, fortalecendo a infraestrutura para atletas, transmissões ao vivo e comunidades de fãs em todo o mundo, consolidando os eSports como parte integrante do entretenimento moderno.</p>
      `
    },
    {
        id: 20,
        categoria: 'Meio Ambiente',
        titulo: 'Países Intensificam Esforços Para Proteger Florestas Tropicais',
        resumo: 'Novos acordos internacionais buscam frear o desmatamento e preservar a biodiversidade das florestas tropicais.',
        imagemUrl: '/images/Meio-ambiente2.jpg',
        conteudo: `
          <p>Líderes de diversas nações assinaram um acordo crucial para fortalecer políticas de conservação e combater o desmatamento nas principais florestas tropicais do mundo, como a Amazônia, o Congo e as florestas do Sudeste Asiático. A iniciativa inclui investimentos em fiscalização, tecnologias de monitoramento e apoio a comunidades locais para o desenvolvimento de práticas sustentáveis.</p>
          <p>A proteção das florestas tropicais é vital para o equilíbrio climático do planeta, atuando como grandes sumidouros de carbono e abrigando uma biodiversidade inestimável. A intensificação dos esforços internacionais reflete a urgência em conter a perda de biomas essenciais para a saúde do ecossistema global.</p>
          <p>Os países signatários se comprometeram a reduzir drasticamente as taxas de desmatamento até 2030, com metas ambiciosas e o desenvolvimento de planos de ação detalhados. A cooperação entre governos, organizações não governamentais e setor privado será fundamental para o sucesso dessas medidas e para garantir um futuro mais verde.</p>
        `
      },
      {
        id: 21,
        categoria: 'Ciência',
        titulo: 'Telescópio Espacial Detecta Planeta Com Condições Semelhantes à Terra',
        resumo: 'Astrônomos analisam atmosfera de exoplaneta que pode abrigar vida.',
        imagemUrl: '/images/Ciencia1.jpg',
        conteudo: `
          <p>O mais recente telescópio espacial, de última geração, realizou uma descoberta extraordinária: a detecção de um exoplaneta localizado em uma zona habitável de sua estrela, apresentando condições atmosféricas e climáticas notavelmente semelhantes às da Terra. A análise inicial sugere a presença de água e de elementos essenciais para a vida.</p>
          <p>Essa revelação representa um marco na busca por vida extraterrestre, reforçando a possibilidade de que nosso universo seja vasto e repleto de planetas capazes de abrigar organismos vivos. A descoberta impulsiona novas linhas de pesquisa e reacende o fascínio pela exploração cósmica e pela nossa posição no universo.</p>
          <p>Missões futuras, com equipamentos ainda mais sofisticados, estão sendo planejadas para estudar o exoplaneta em maior detalhe. Cientistas esperam coletar dados mais precisos sobre sua composição e, quem sabe, encontrar sinais diretos de atividade biológica, o que revolucionaria nossa compreensão sobre a vida no cosmos.</p>
        `
      },
      {
        id: 22,
        categoria: 'Cultura',
        titulo: 'Museu Nacional Reabre Com Exposição Sobre Civilizações Antigas',
        resumo: 'Visitantes podem explorar artefatos históricos restaurados após incêndio que devastou o acervo.',
        imagemUrl: '/images/Cultura1.jpg',
        conteudo: `
          <p>Após anos de um árduo processo de reconstrução e restauração, o Museu Nacional reabriu suas portas ao público com uma nova e impactante exposição dedicada às civilizações antigas do mundo. O incêndio que devastou parte de seu acervo em 2018 deixou uma ferida na memória cultural do país, mas a reabertura simboliza a resiliência e o compromisso com a preservação da história.</p>
          <p>A exposição apresenta artefatos históricos cuidadosamente restaurados e peças inéditas, convidando os visitantes a uma viagem no tempo para explorar as culturas e os legados de povos ancestrais. Este evento é de suma importância para a recuperação de um patrimônio cultural e científico inestimável, reafirmando o papel do museu como um centro de conhecimento e aprendizado.</p>
          <p>Novas exposições temáticas e projetos educativos estão programados para o futuro, visando fortalecer o engajamento da sociedade com a história, a ciência e a cultura. A reabertura do Museu Nacional é um convite para que as novas gerações se reconectem com o passado e inspirem-se na riqueza do conhecimento humano.</p>
        `
      },
      {
        id: 23,
        categoria: 'Segurança Pública',
        titulo: 'Operação Contra Cibercrimes Identifica Rede de Fraudes Online',
        resumo: 'Equipes especializadas desmantelam grupo responsável por golpes financeiros na internet.',
        imagemUrl: '/images/Seguranca1.jpg',
        conteudo: `
          <p>Uma operação policial conjunta de larga escala, envolvendo forças de segurança de diversos estados, resultou na identificação e desmantelamento de uma complexa rede nacional de cibercrimes. O grupo criminoso era especializado em golpes financeiros online, incluindo fraudes bancárias, clonagem de cartões e extorsões virtuais, causando prejuízos milionários a milhares de vítimas.</p>
          <p>A ação reforça a crescente importância do combate ao crime digital, que tem se tornado uma ameaça cada vez mais sofisticada. A colaboração entre diferentes agências e a expertise em tecnologia forense foram cruciais para o sucesso da operação, protegendo os cidadãos de novas fraudes e recuperando ativos ilícitos.</p>
          <p>As investigações continuam para identificar possíveis conexões internacionais da rede criminosa e localizar outras vítimas em potencial. As autoridades alertam para a necessidade de medidas preventivas de segurança online e prometem intensificar as ações para garantir um ambiente digital mais seguro para todos.</p>
        `
      },
      {
        id: 24,
        categoria: 'Turismo',
        titulo: 'Destinos Sustentáveis Ganham Popularidade Entre Viajantes em 2025',
        resumo: 'Turismo ecológico cresce com foco em preservação e impacto ambiental reduzido.',
        imagemUrl: '/images/Turismo1.jpg',
        conteudo: `
          <p>Relatórios recentes de agências de viagem e plataformas de reservas apontam um aumento expressivo na procura por destinos sustentáveis e experiências de ecoturismo para o ano de 2025. Viajantes de todas as idades estão demonstrando maior consciência ambiental e preferindo roteiros que valorizam a preservação da natureza e o desenvolvimento local.</p>
          <p>O crescimento do turismo sustentável é um reflexo da mudança de mentalidade global em relação ao impacto das viagens. Essa modalidade não apenas preserva recursos naturais e culturais, mas também beneficia diretamente as comunidades locais, gerando renda e promovendo o respeito à diversidade cultural e biológica.</p>
          <p>Governos e empresas do setor turístico estão respondendo a essa demanda, investindo em infraestrutura ecológica, certificações de sustentabilidade e campanhas de conscientização para atrair viajantes responsáveis. A tendência é que o turismo se torne cada vez mais uma ferramenta para a conservação e o desenvolvimento comunitário.</p>
        `
      },
      {
        id: 25,
        categoria: 'Moda',
        titulo: 'Estilistas Apresentam Tendências Tecnológicas Para Roupas Inteligentes',
        resumo: 'Novos tecidos interativos podem mudar a maneira como as pessoas se vestem no dia a dia.',
        imagemUrl: '/images/Moda1.jpg',
        conteudo: `
          <p>Durante a prestigiada semana de moda de Paris, estilistas renomados apresentaram coleções que revolucionam o conceito de vestuário, incorporando tendências tecnológicas avançadas. O destaque foram as 'roupas inteligentes', confeccionadas com novos tecidos interativos que podem, por exemplo, regular a temperatura corporal, monitorar dados de saúde e até mesmo se conectar via Bluetooth a outros dispositivos.</p>
          <p>Essas inovações prometem transformar a maneira como as pessoas se vestem no dia a dia, unindo funcionalidade e estilo de uma forma inédita. A moda, que antes se limitava à estética, agora se expande para áreas como esportes (com roupas que otimizam o desempenho), saúde (com monitoramento constante) e bem-estar, oferecendo uma experiência de uso muito mais completa.</p>
          <p>A expectativa é que essas roupas inteligentes ganhem espaço no mercado de consumo até o final de 2025, tornando-se mais acessíveis e integrando-se à rotina das pessoas. A indústria da moda está se adaptando rapidamente às novas tecnologias, criando um futuro onde o vestuário não será apenas sobre o que se veste, mas também sobre o que ele pode fazer por você.</p>
        `
      },
      {
        id: 26,
        categoria: 'Automóveis',
        titulo: 'Novo Carro Elétrico Promete Maior Autonomia Com Bateria Aprimorada',
        resumo: 'Modelo inovador traz tecnologia que prolonga duração da carga e reduz tempo de recarga.',
        imagemUrl: '/images/Automoveis1.jpg',
        conteudo: `
          <p>Uma montadora global de destaque anunciou o lançamento de um novo carro elétrico que promete quebrar barreiras no setor. O modelo, que incorpora uma bateria aprimorada de silício-carbono, alcança uma autonomia recorde de 900 km com uma única carga, além de reduzir drasticamente o tempo necessário para recarregar.</p>
          <p>Esse avanço tecnológico é de extrema importância, pois a autonomia e o tempo de recarga são dois dos principais desafios para a popularização dos veículos elétricos. Ao superar essas barreiras, o novo carro pode impulsionar significativamente a adoção de carros elétricos em larga escala, contribuindo para a redução da emissão de gases poluentes.</p>
          <p>A pré-venda do veículo está prevista para o segundo semestre deste ano, e o lançamento promete redefinir o padrão de eficiência e praticidade no segmento automotivo. O mercado de carros elétricos está em constante evolução, e inovações como essa são cruciais para acelerar a transição global para a mobilidade sustentável.</p>
        `
      },
      {
        id: 27,
        categoria: 'Jogos',
        titulo: 'Nova Geração de Consoles Chega ao Mercado Com Gráficos Ultra-Realistas',
        resumo: 'Processadores potentes elevam a experiência dos jogadores a um novo patamar de imersão.',
        imagemUrl: '/images/Jogos2.jpg',
        conteudo: `
          <p>As principais fabricantes de consoles de videogame lançaram no mercado seus modelos de nova geração, prometendo uma experiência de jogo sem precedentes. Equipados com processadores gráficos (GPUs) dedicados e suporte à tecnologia de ray tracing em tempo real, os novos consoles oferecem gráficos ultra-realistas, com iluminação, sombras e reflexos que simulam o mundo real de forma impressionante.</p>
          <p>Este salto tecnológico eleva a experiência dos jogadores a um novo patamar de imersão, tornando os ambientes virtuais mais críveis e detalhados. A capacidade de processamento dos novos consoles também permite mundos de jogo mais complexos, inteligência artificial mais sofisticada e taxas de quadros por segundo mais fluidas, resultando em uma jogabilidade superior.</p>
          <p>Desenvolvedores de jogos de todo o mundo já estão lançando títulos otimizados para essa nova geração, explorando ao máximo o potencial gráfico e de desempenho. A expectativa é que, nos próximos anos, vejamos uma revolução no design de jogos, com experiências cada vez mais cinematográficas e interativas.</p>
        `
      },
      {
        id: 28,
        categoria: 'Educação',
        titulo: 'Governo Lança Programa de Bolsas Para Estudantes de Baixa Renda',
        resumo: 'Iniciativa busca ampliar acesso ao ensino superior por meio de financiamentos educacionais.',
        imagemUrl: '/images/Educacao2.jpg',
        conteudo: `
          <p>O governo federal anunciou o lançamento de um novo e abrangente programa de bolsas de estudo, destinado a estudantes de baixa renda que buscam acesso ao ensino superior. A iniciativa visa conceder bolsas integrais e parciais para ingresso em universidades públicas e privadas, democratizando o acesso à educação de qualidade e promovendo a inclusão social.</p>
          <p>Essa ação é de fundamental importância para reduzir as desigualdades educacionais no país, oferecendo oportunidades para jovens talentos que, de outra forma, não teriam condições de cursar uma faculdade. O investimento em educação é visto como um pilar essencial para o desenvolvimento social e econômico a longo prazo.</p>
          <p>As inscrições para o programa serão abertas em breve, com critérios que considerarão tanto o desempenho acadêmico dos estudantes quanto sua situação de vulnerabilidade social. A expectativa é que o programa beneficie milhares de jovens em todo o país, transformando vidas e construindo um futuro com mais oportunidades para todos.</p>
        `
      },
      {
        id: 29,
        categoria: 'Ciência',
        titulo: 'Cientistas Descobrem Nova Forma de Vida em Profundezas Oceânicas',
        resumo: 'Espécie recém-identificada pode fornecer pistas sobre evolução em ambientes extremos.',
        imagemUrl: '/images/Ciencia2.jpg',
        conteudo: `
          <p>Uma missão submarina de pesquisa científica fez uma descoberta extraordinária nas profundezas do oceano Pacífico: uma nova e completamente desconhecida forma de vida. A espécie, que se adapta a ambientes extremos sem luz solar e com alta pressão, oferece pistas valiosas sobre a evolução da vida em condições adversas.</p>
          <p>O achado é de grande relevância para a biologia marinha e a astrobiologia, pois nos ajuda a entender como a vida pode surgir e persistir em ambientes hostis, tanto na Terra quanto em outros corpos celestes. A biodiversidade dos oceanos ainda guarda muitos segredos, e cada nova descoberta expande nosso conhecimento sobre o planeta.</p>
          <p>Cientistas agora se debruçam sobre o estudo dessa criatura, com planos de sequenciar seu genoma para desvendar suas adaptações genéticas e processos metabólicos únicos. A pesquisa pode ter implicações para o desenvolvimento de novas tecnologias e para a compreensão da habitabilidade de outros planetas em nosso sistema solar e além.</p>
        `
      },
      {
        id: 30,
        categoria: 'Cultura',
        titulo: 'Festival Literário Internacional Destaca Novos Autores Brasileiros',
        resumo: 'Evento reúne escritores emergentes e consagrados para debates e lançamentos de livros.',
        imagemUrl: '/images/Cultura2.jpg',
        conteudo: `
          <p>O prestigiado Festival Literário Internacional de 2025 dedicou uma parte significativa de sua programação a destacar a nova geração de autores brasileiros. O evento reuniu escritores emergentes e consagrados em uma série de debates, mesas-redondas e sessões de autógrafos, celebrando a riqueza e a diversidade da literatura nacional.</p>
          <p>O festival desempenha um papel crucial ao promover a leitura, incentivar a produção literária e dar visibilidade a talentos que estão despontando no cenário nacional. A oportunidade de interagir com o público e com outros escritores é invaluable para o desenvolvimento e reconhecimento desses novos autores.</p>
          <p>Além da programação intensa, o evento também impulsionou a venda de livros e a troca cultural. Muitos dos autores premiados e destacados no festival ganharam visibilidade internacional, resultando em novos contratos com editoras estrangeiras e a expansão da literatura brasileira para outros mercados.</p>
        `
      },
      {
        id: 31,
        categoria: 'Segurança Pública',
        titulo: 'Nova Tecnologia de Reconhecimento Facial Será Implementada em Aeroportos',
        resumo: 'Sistema promete aumentar a segurança e agilizar processos de imigração e embarque.',
        imagemUrl: '/images/Seguranca2.jpg',
        conteudo: `
          <p>Autoridades de segurança aeroportuária confirmaram a implementação de uma nova e avançada tecnologia de reconhecimento facial nos principais aeroportos do país. O sistema, que utiliza inteligência artificial e câmeras de alta precisão, visa aumentar a segurança nas áreas restritas e agilizar significativamente os processos de imigração e embarque de passageiros.</p>
          <p>A adoção dessa tecnologia é vista como um passo importante para modernizar a infraestrutura de segurança e responder às crescentes demandas por eficiência e controle. A expectativa é que o reconhecimento facial reduza filas, previna fraudes de identidade e garanta um controle mais rigoroso sobre o fluxo de pessoas, tornando as viagens aéreas mais seguras e fluidas.</p>
          <p>O sistema será inicialmente testado em cinco aeroportos-piloto antes de ser expandido para toda a rede nacional. A iniciativa gerou debates sobre privacidade de dados, mas as autoridades garantem que todas as medidas de proteção e conformidade legal estão sendo tomadas para salvaguardar as informações dos cidadãos.</p>
        `
      },
      {
        id: 32,
        categoria: 'Turismo',
        titulo: 'Empresas de Aviação Testam Voos Comerciais Com Combustível Sustentável',
        resumo: 'Iniciativa pode reduzir emissões de carbono no setor e transformar o futuro das viagens aéreas.',
        imagemUrl: '/images/Turismo2.jpg',
        conteudo: `
          <p>Companhias aéreas de ponta iniciaram testes de voos comerciais utilizando Combustível Sustentável de Aviação (SAF), derivado de biomassa e resíduos orgânicos. Essa iniciativa é um marco na busca por reduzir as emissões de carbono do setor aéreo, um dos mais desafiadores em termos de descarbonização.</p>
          <p>A aviação é responsável por uma parcela significativa das emissões globais de gases de efeito estufa. A aposta no SAF busca tornar o setor mais verde e alinhado com as metas climáticas globais, oferecendo uma alternativa mais ecológica aos combustíveis fósseis tradicionais. O sucesso desses testes é crucial para o futuro das viagens aéreas.</p>
          <p>Se os resultados dos testes forem positivos e a produção de SAF se tornar economicamente viável em larga escala, a substituição parcial de combustíveis fósseis poderá começar já em 2026. Essa transição não apenas beneficiará o meio ambiente, mas também posicionará a indústria da aviação na vanguarda da sustentabilidade global.</p>
        `
      },
      {
        id: 33,
        categoria: 'Moda',
        titulo: 'Inteligência Artificial Revoluciona o Design de Roupas Personalizadas',
        resumo: 'Novos algoritmos permitem a criação de peças sob medida com base no estilo e preferências de cada consumidor.',
        imagemUrl: '/images/Moda2.jpg',
        conteudo: `
          <p>O setor da moda está passando por uma revolução impulsionada pela Inteligência Artificial. Novas plataformas de design e produção estão utilizando algoritmos avançados para permitir a criação de peças de roupa verdadeiramente personalizadas, sob medida para o estilo, as preferências e até mesmo o biotipo de cada consumidor.</p>
          <p>Esse recurso democratiza o acesso à moda sob medida, que antes era restrita à alta-costura. Além de oferecer exclusividade, a produção sob demanda, guiada por IA, pode reduzir significativamente o desperdício na indústria têxtil, que é uma das mais poluentes do mundo. A sustentabilidade e a personalização caminham lado a lado nessa nova era da moda.</p>
          <p>Grandes marcas já estão de olho nesse modelo e pretendem adotá-lo nos próximos lançamentos comerciais, transformando a cadeia de valor da moda. A expectativa é que, em breve, comprar uma roupa seja uma experiência totalmente nova, onde o consumidor participa ativamente da criação de suas peças favoritas.</p>
        `
      },
      {
        id: 34,
        categoria: 'Automóveis',
        titulo: 'Carros Voadores Começam Testes Para Uso Urbano',
        resumo: 'Tecnologia promissora busca reduzir congestionamentos e oferecer alternativas de transporte aéreo acessível.',
        imagemUrl: '/images/Automoveis2.jpg',
        conteudo: `
          <p>O sonho dos carros voadores está mais perto de se tornar realidade. Empresas de tecnologia e mobilidade iniciaram os primeiros voos de teste com veículos elétricos de decolagem e pouso vertical (eVTOLs), popularmente conhecidos como "carros voadores", em áreas urbanas controladas. O objetivo é avaliar a segurança, a viabilidade e a integração desses veículos no tráfego aéreo das cidades.</p>
          <p>A tecnologia promete revolucionar a mobilidade urbana, oferecendo uma alternativa para reduzir os severos congestionamentos nas grandes metrópoles. A ideia é que, em um futuro próximo, esses veículos proporcionem um transporte aéreo acessível e eficiente, encurtando distâncias e otimizando o tempo de deslocamento.</p>
          <p>As aeronaves ainda aguardam a aprovação de órgãos reguladores de aviação em diversos países para que possam operar comercialmente, o que é esperado para 2027. A corrida pelo desenvolvimento de carros voadores está aquecida, e a expectativa é que eles transformem radicalmente o conceito de transporte pessoal e público nas próximas décadas.</p>
        `
      }
    ];

module.exports = todasNoticias;