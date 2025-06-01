const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const session = require('express-session');
const todasNoticias = require('./data/todas-noticias');

const app = express();

app.use(session({
    secret: 'newsstream_secret',
    resave: false, 
    saveUninitialized: true 
}));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

app.use(express.static(path.join(__dirname, 'public')));

const db = new sqlite3.Database('./database/usuarios.db', err => {
    if (err) console.error("Erro ao conectar ao SQLite:", err.message);
    else console.log('Conectado ao SQLite.');
});

db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    notificacoes INTEGER
)`);

const categorias = [
    'Política', 'Tecnologia', 'Esportes', 'Saúde', 'Negócios',
    'Gastronomia', 'Meio Ambiente', 'Entretenimento', 'Justiça',
    'Educação', 'Ciência', 'Cultura', 'Segurança Pública',
    'Turismo', 'Moda', 'Automóveis', 'Jogos'
];

let todosComentarios = [
  { id: 1, autor: "André Fernandes", texto: "Ótima notícia! A reforma tributária é muito necessária.", data: "01/06/2025", noticiaId: 1, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 2, autor: "Mariana Costa", texto: "Espero que o cashback realmente ajude as famílias de baixa renda.", data: "01/06/2025", noticiaId: 1, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 69, autor: "Roberto Almeida", texto: "Essa reforma é mais do mesmo, só vai beneficiar os ricos. Falta transparência!", data: "01/06/2025", noticiaId: 1, denunciado: true, motivoDenuncia: "Informação falsa", detalhesDenuncia: "Alegações sem provas sobre benefício a ricos." },

  { id: 3, autor: "Paulo Henrique", texto: "Que virada espetacular do União FC! Fiquei arrepiado.", data: "01/06/2025", noticiaId: 2, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 4, autor: "Sofia Lima", texto: "Finalmente um título depois de tanto tempo! Parabéns ao time.", data: "01/06/2025", noticiaId: 2, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 70, autor: "Guilherme Sampaio", texto: "Vitória roubada! A arbitragem claramente favoreceu o União FC. Que vergonha!", data: "01/06/2025", noticiaId: 2, denunciado: true, motivoDenuncia: "Discurso de ódio", detalhesDenuncia: "Acusação sem provas e incitação à rivalidade." },

  { id: 5, autor: "Camila Santos", texto: "A reforma eleitoral é sempre um debate importante. Tomara que avance.", data: "01/06/2025", noticiaId: 3, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 6, autor: "Felipe Rodrigues", texto: "Transparência nas eleições é algo que a gente precisa muito!", data: "01/06/2025", noticiaId: 3, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 71, autor: "Beatriz Nogueira", texto: "Outra reforma só para enganar o povo. Eles nunca mudam de verdade.", data: "01/06/2025", noticiaId: 3, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },

  { id: 7, autor: "Laura Pereira", texto: "Um avanço revolucionário em IA! O futuro chegou.", data: "01/06/2025", noticiaId: 4, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 8, autor: "Rafael Silveira", texto: "Será que essa IA vai nos ajudar no dia a dia? Ansioso para ver.", data: "01/06/2025", noticiaId: 4, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 72, autor: "Isabela Fonseca", texto: "IA é uma moda passageira. Em breve ninguém mais vai falar disso. Puro hype.", data: "01/06/2025", noticiaId: 4, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },

  { id: 9, autor: "Bruno Cardoso", texto: "Convocação da seleção com surpresas? Gosto assim!", data: "01/06/2025", noticiaId: 5, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 10, autor: "Larissa Machado", texto: "Muita expectativa para a Copa do Mundo com esse novo time.", data: "01/06/2025", noticiaId: 5, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 73, autor: "Vinicius Neves", texto: "O técnico é um incompetente! Deixou os melhores de fora. Vamos perder de lavada!", data: "01/06/2025", noticiaId: 5, denunciado: true, motivoDenuncia: "Conteúdo impróprio", detalhesDenuncia: "Ofensas diretas ao técnico." },

  { id: 11, autor: "Diego Martins", texto: "Otimismo no mercado é um bom sinal para a economia.", data: "01/06/2025", noticiaId: 6, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 12, autor: "Amanda Gomes", texto: "Com as taxas de juros mantidas, o setor de varejo deve sentir o impacto positivo.", data: "01/06/2025", noticiaId: 6, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 74, autor: "Gustavo Mendes", texto: "Esse 'otimismo' é fachada. A inflação ainda é um problema sério que não está sendo abordado.", data: "01/06/2025", noticiaId: 6, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },

  { id: 13, autor: "Fernanda Ribeiro", texto: "Financiamento bilionário em energia limpa é o que precisamos para o futuro!", data: "01/06/2025", noticiaId: 7, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 14, autor: "Thiago Rocha", texto: "É um passo enorme para combater as mudanças climáticas.", data: "01/06/2025", noticiaId: 7, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 75, autor: "Mariana Duarte", texto: "Energia limpa é um conto de fadas para a mídia. Não vai mudar nada no aquecimento global, é tudo natural.", data: "01/06/2025", noticiaId: 7, denunciado: true, motivoDenuncia: "Informação falsa", detalhesDenuncia: "Negação de dados científicos sobre aquecimento global." },

  { id: 15, autor: "Luciana Braga", texto: "Esses avanços no tratamento do câncer renovam a esperança de muitos pacientes.", data: "01/06/2025", noticiaId: 8, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 16, autor: "Roberto Pires", texto: "A pesquisa médica está cada vez mais promissora. Uma luz no fim do túnel.", data: "01/06/2025", noticiaId: 8, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 76, autor: "Daniel Oliveira", texto: "Mais uma 'promessa'. Nunca vejo esses tratamentos chegarem de verdade ao povo.", data: "01/06/2025", noticiaId: 8, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },

  { id: 17, autor: "Patrícia Assis", texto: "Filme de ficção científica espetacular! Já quero a continuação.", data: "01/06/2025", noticiaId: 9, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 18, autor: "Carlos Eduardo", texto: "Os efeitos visuais são de cair o queixo! Valeu cada centavo.", data: "01/06/2025", noticiaId: 9, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 77, autor: "Julio César", texto: "O enredo é péssimo e os personagens são chatos. Só efeitos especiais não salvam um filme ruim.", data: "01/06/2025", noticiaId: 9, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },

  { id: 19, autor: "Ana Paula", texto: "A decisão sobre liberdade de expressão é crucial para o ambiente online.", data: "01/06/2025", noticiaId: 10, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 20, autor: "Lucas Ferreira", texto: "Finalmente uma regulamentação para o que se posta nas redes.", data: "01/06/2025", noticiaId: 10, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 78, autor: "Clara Guedes", texto: "Essa decisão é um ataque à liberdade de expressão! Vão censurar todo mundo agora.", data: "01/06/2025", noticiaId: 10, denunciado: true, motivoDenuncia: "Informação falsa", detalhesDenuncia: "Alegação de censura generalizada sem base." },

  { id: 21, autor: "Gabriela Faria", texto: "Que orgulho da chef brasileira! Reconhecimento merecido.", data: "01/06/2025", noticiaId: 11, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 22, autor: "Márcia Azevedo", texto: "Mal posso esperar para provar essa culinária sustentável.", data: "01/06/2025", noticiaId: 11, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 79, autor: "Fernando Lopes", texto: "Restaurante sustentável? Provavelmente comida sem graça e cara demais. Prefiro um bom churrasco.", data: "01/06/2025", noticiaId: 11, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },

  { id: 23, autor: "Professor João", texto: "5G nas escolas vai transformar o ensino. Excelente iniciativa!", data: "01/06/2025", noticiaId: 12, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 24, autor: "Beatriz Oliveira", texto: "Aulas interativas e realidade aumentada? Que demais!", data: "01/06/2025", noticiaId: 12, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 80, autor: "Mônica Viana", texto: "Mais tecnologia? O que precisamos é de mais professores e menos telas!", data: "01/06/2025", noticiaId: 12, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },

  { id: 25, autor: "Sérgio Dutra", texto: "Chip neural é um marco na interação humano-máquina.", data: "01/06/2025", noticiaId: 13, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 26, autor: "Viviane Castro", texto: "As possibilidades para tratamento de doenças são incríveis.", data: "01/06/2025", noticiaId: 13, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 81, autor: "Alexandre Pires", texto: "Vão implantar chips em todo mundo e nos controlar! Isso é o fim da liberdade!", data: "01/06/2025", noticiaId: 13, denunciado: true, motivoDenuncia: "Informação falsa", detalhesDenuncia: "Teoria da conspiração sem base." },

  { id: 27, autor: "Carolina Farias", texto: "Terapia genética é a fronteira da medicina. Que esperança para os pacientes.", data: "01/06/2025", noticiaId: 14, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 28, autor: "Eduardo Campos", texto: "Notícias como essa nos dão muita força para continuar lutando.", data: "01/06/2025", noticiaId: 14, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 82, autor: "Renato Dantas", texto: "Tudo marketing das farmacêuticas. Nunca vão achar a cura de verdade para vender remédios.", data: "01/06/2025", noticiaId: 14, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },

  { id: 29, autor: "Isabela Rocha", texto: "Dinheiro em startups de energia renovável é um investimento no futuro do planeta.", data: "01/06/2025", noticiaId: 15, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 30, autor: "Paulo Gabriel", texto: "O mercado está se alinhando com a sustentabilidade, e isso é ótimo.", data: "01/06/2025", noticiaId: 15, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 83, autor: "Vitor Hugo", texto: "Isso é só uma bolha. Energia renovável não é tão lucrativa quanto dizem.", data: "01/06/2025", noticiaId: 15, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },

  { id: 31, autor: "Helena Albuquerque", texto: "IA criando receitas personalizadas? Quero experimentar!", data: "01/06/2025", noticiaId: 16, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 32, autor: "André Luiz", texto: "Isso vai transformar a experiência em restaurantes. Genial!", data: "01/06/2025", noticiaId: 16, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 84, autor: "Sandra Regina", texto: "A culinária é arte, não algoritmo! Isso descaracteriza a gastronomia.", data: "01/06/2025", noticiaId: 16, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },

  { id: 33, autor: "Cláudia Miranda", texto: "Documentário sobre exploração espacial que emociona! Recomendo.", data: "01/06/2025", noticiaId: 17, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 34, autor: "Tiago Nogueira", texto: "O filme nos faz sonhar com o que está além do nosso planeta.", data: "01/06/2025", noticiaId: 17, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 85, autor: "Renata Barreto", texto: "Que documentário parado! Só mostra imagem velha e gente chata falando. Não recomendo.", data: "01/06/2025", noticiaId: 17, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },

  { id: 35, autor: "Marcelo Cunha", texto: "As novas regras para crimes digitais são urgentes e necessárias.", data: "01/06/2025", noticiaId: 18, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 36, autor: "Lívia Viana", texto: "Espero que isso traga mais segurança para todos nós online.", data: "01/06/2025", noticiaId: 18, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 86, autor: "Pedro Souza", texto: "Ninguém vai seguir essas regras. A internet é livre! Quero ver pegarem os hackers de verdade!", data: "01/06/2025", noticiaId: 18, denunciado: true, motivoDenuncia: "Discurso de ódio", detalhesDenuncia: "Incitamento à desobediência e ofensa." },

  { id: 37, autor: "Fernando Guedes", texto: "O campeonato de eSports foi épico! O cenário só cresce.", data: "01/06/2025", noticiaId: 19, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 38, autor: "Gabriela Dias", texto: "Público recorde e premiação gigante! É o reconhecimento que o eSports merece.", data: "01/06/2025", noticiaId: 19, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 87, autor: "Ricardo Pereira", texto: "Esports não é esporte de verdade. É só gente sentada jogando videogame, que ridículo!", data: "01/06/2025", noticiaId: 19, denunciado: true, motivoDenuncia: "Conteúdo impróprio", detalhesDenuncia: "Desrespeito e ataque a um grupo." },

  { id: 39, autor: "Simone Mendes", texto: "Proteger florestas tropicais é uma luta que vale a pena! Excelente.", data: "01/06/2025", noticiaId: 20, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 40, autor: "Daniel Santos", texto: "Que os acordos sejam implementados com rigor para frear o desmatamento.", data: "01/06/2025", noticiaId: 20, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 88, autor: "Antônio da Silva", texto: "Tudo isso é bobagem. A floresta é para ser usada, não para ficar parada. Vão proibir o progresso?", data: "01/06/2025", noticiaId: 20, denunciado: true, motivoDenuncia: "Discurso de ódio", detalhesDenuncia: "Ataque a valores ambientais e incitação." },

  { id: 41, autor: "Juliana Rocha", texto: "Um planeta parecido com a Terra! Mal posso esperar para saber mais.", data: "01/06/2025", noticiaId: 21, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 42, autor: "Guilherme S.", texto: "Essa descoberta abre novas fronteiras para a pesquisa de exoplanetas.", data: "01/06/2025", noticiaId: 21, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 89, autor: "Márcio Oliveira", texto: "Mais uma mentira da NASA para nos enganar! O espaço não existe, é tudo uma farsa.", data: "01/06/2025", noticiaId: 21, denunciado: true, motivoDenuncia: "Informação falsa", detalhesDenuncia: "Negação de ciência básica." },

  { id: 43, autor: "Fábio Dantas", texto: "A reabertura do Museu Nacional é um marco para a cultura e ciência do país.", data: "01/06/2025", noticiaId: 22, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 44, autor: "Aline Pereira", texto: "Quero muito ver a exposição sobre civilizações antigas!", data: "01/06/2025", noticiaId: 22, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 90, autor: "Sergio Almeida", texto: "Dinheiro jogado fora. Ninguém se importa com museus antigos hoje em dia. Deviam construir shoppings.", data: "01/06/2025", noticiaId: 22, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },

  { id: 45, autor: "Cristiane F.", texto: "A operação contra cibercrimes é essencial para proteger os cidadãos online.", data: "01/06/2025", noticiaId: 23, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 46, autor: "Renato Borges", texto: "Fico feliz em ver que estão combatendo esses golpistas da internet.", data: "01/06/2025", noticiaId: 23, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 91, autor: "Natália Rocha", texto: "Nunca vão me pegar! Eu sou muito mais inteligente que esses policiais.", data: "01/06/2025", noticiaId: 23, denunciado: true, motivoDenuncia: "Conteúdo impróprio", detalhesDenuncia: "Confissão/ameaça de atividade ilegal." },

  { id: 47, autor: "Vanessa Lima", texto: "Destinos sustentáveis são a minha preferência. É bom ver essa popularidade.", data: "01/06/2025", noticiaId: 24, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 48, autor: "André Felipe", texto: "O ecoturismo tem um potencial enorme para o Brasil.", data: "01/06/2025", noticiaId: 24, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 92, autor: "Flávia Cristina", texto: "Sustentabilidade é chato. Quero aventura de verdade, sem essas regras bobas.", data: "01/06/2025", noticiaId: 24, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },

  { id: 49, autor: "Mariana Almeida", texto: "Roupas inteligentes! Mal posso esperar para ver como isso vai mudar o dia a dia.", data: "01/06/2025", noticiaId: 25, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 50, autor: "Thiago Mendes", texto: "A fusão de moda e tecnologia é o caminho para inovações incríveis.", data: "01/06/2025", noticiaId: 25, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 93, autor: "Rodrigo Viana", texto: "Roupas com chip? Que absurdo! Preferia a moda antiga, isso é ridículo.", data: "01/06/2025", noticiaId: 25, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },

  { id: 51, autor: "Patrícia Viana", texto: "900 km de autonomia? Isso é um divisor de águas para os carros elétricos!", data: "01/06/2025", noticiaId: 26, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 52, autor: "Pedro Henrique", texto: "Menos tempo recarregando e mais tempo na estrada. Perfeito!", data: "01/06/2025", noticiaId: 26, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 94, autor: "Ana Clara Silva", texto: "Carro elétrico é brinquedo. Nada supera o ronco de um motor V8. É tudo marketing verde.", data: "01/06/2025", noticiaId: 26, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },

  { id: 53, autor: "João Vitor", texto: "A nova geração de consoles com gráficos ultra-realistas é sensacional. A jogabilidade está no máximo.", data: "01/06/2025", noticiaId: 27, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 54, autor: "Isabela Oliveira", texto: "É um desafio criar para essa potência, mas o resultado final é incrível.", data: "01/06/2025", noticiaId: 27, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 95, autor: "Lucas Gomes", texto: "Os gráficos estão bons, mas a história é repetitiva e o jogo é cheio de bugs! Puro lixo.", data: "01/06/2025", noticiaId: 27, denunciado: true, motivoDenuncia: "Conteúdo impróprio", detalhesDenuncia: "Linguagem ofensiva e desrespeitosa." },

  { id: 55, autor: "Gabriel Costa", texto: "Programas de bolsas para baixa renda abrem portas para muitos como eu. Uma chance de ouro.", data: "01/06/2025", noticiaId: 28, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 56, autor: "Larissa Almeida", texto: "Investir na educação de todos é o que constrói um futuro melhor para o país.", data: "01/06/2025", noticiaId: 28, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 96, autor: "Manoel Souza", texto: "Bolsas? Que piada! No final, é sempre para os mesmos. A educação no Brasil não tem jeito.", data: "01/06/2025", noticiaId: 28, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },

  { id: 57, autor: "Carolina Farias", texto: "Descobertas de novas formas de vida nas profundezas são fascinantes. O oceano guarda muitos segredos.", data: "01/06/2025", noticiaId: 29, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 58, autor: "Diego Mendes", texto: "Isso nos faz refletir sobre a diversidade da vida e o que mais existe no universo.", data: "01/06/2025", noticiaId: 29, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 97, autor: "Sara Rodrigues", texto: "Besteira! Não acredito nessas 'novas formas de vida'. É tudo invenção para tirar dinheiro do governo.", data: "01/06/2025", noticiaId: 29, denunciado: true, motivoDenuncia: "Informação falsa", detalhesDenuncia: "Ataque à ciência e alegação de fraude." },

  { id: 59, autor: "Ana Júlia", texto: "Festival literário é sempre um deleite! Que bom ver autores brasileiros em destaque.", data: "01/06/2025", noticiaId: 30, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 60, autor: "Eduardo Rocha", texto: "Eventos assim inspiram e dão voz a novos talentos. Muito importante.", data: "01/06/2025", noticiaId: 30, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 98, autor: "Sandra Dias", texto: "Literatura brasileira é fraca. Só fazem livros chatos e sem criatividade. Deviam ler mais clássicos estrangeiros.", data: "01/06/2025", noticiaId: 30, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },

  { id: 61, autor: "Felipe Goulart", texto: "Tecnologia de reconhecimento facial nos aeroportos é um avanço para a segurança.", data: "01/06/2025", noticiaId: 31, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 62, autor: "Mariana Barreto", texto: "Agilidade e controle são essenciais em ambientes como aeroportos.", data: "01/06/2025", noticiaId: 31, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 99, autor: "Carlos Alberto", texto: "Isso é invasão de privacidade! Não quero meu rosto em nenhum banco de dados do governo. Absurdo!", data: "01/06/2025", noticiaId: 31, denunciado: true, motivoDenuncia: "Conteúdo impróprio", detalhesDenuncia: "Linguagem agressiva e alarmista." },

  { id: 63, autor: "Renata Cintra", texto: "Voos com combustível sustentável! É um futuro mais verde para a aviação.", data: "01/06/2025", noticiaId: 32, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 64, autor: "Marcelo Queiroz", texto: "A tecnologia está avançando rapidamente para tornar as viagens aéreas mais ecológicas.", data: "01/06/2025", noticiaId: 32, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 100, autor: "Vanessa Nogueira", texto: "Isso é pura propaganda! As empresas só querem parecer verdes, mas continuam poluindo.", data: "01/06/2025", noticiaId: 32, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },

  { id: 65, autor: "Beatriz Mota", texto: "IA revolucionando o design de roupas é ótimo para personalização e sustentabilidade.", data: "01/06/2025", noticiaId: 33, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 66, autor: "Luana Gomes", texto: "As possibilidades são infinitas quando a tecnologia se une à criatividade na moda.", data: "01/06/2025", noticiaId: 33, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 101, autor: "Felipe Costa", texto: "Roupas feitas por IA? Que horror! Vão ser todas iguais e sem alma. A moda está morrendo.", data: "01/06/2025", noticiaId: 33, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },

  { id: 67, autor: "Gustavo Ferreira", texto: "Carros voadores para reduzir congestionamentos? Parece um sonho, mas está perto!", data: "01/06/2025", noticiaId: 34, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 68, autor: "Clara Guedes", texto: "A mobilidade aérea urbana pode realmente mudar o cenário das grandes metrópoles.", data: "01/06/2025", noticiaId: 34, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
  { id: 102, autor: "Alexandre Barros", texto: "Carros voadores são uma fantasia cara. Não vão resolver o trânsito e só vão criar mais problemas no ar.", data: "01/06/2025", noticiaId: 34, denunciado: false, motivoDenuncia: null, detalhesDenuncia: null },
];

app.get('/', (req, res) => res.redirect('/login'));

app.get('/main', (req, res) => {
    if (!req.session.usuario) {
        return res.redirect('/login');
    }

    const selecionada = req.query.categoria || 'Todas';
    const noticias = selecionada === 'Todas' ? todasNoticias : todasNoticias.filter(n => n.categoria === selecionada);
    const numNotifications = todosComentarios.filter(c => c.denunciado).length;
    const isAdminUser = (req.session.usuario.email === 'admin@newsstream.com');

    res.render('main', {
        nome: req.session.usuario.nome,
        categorias,
        noticias,
        selecionada,
        usuario: req.session.usuario,
        isAdminView: isAdminUser,
        numNotifications: numNotifications 
    });
});

app.get('/noticias/:id', (req, res) => {
    const noticiaId = parseInt(req.params.id);
    const noticia = todasNoticias.find(n => n.id === noticiaId); 

    if (!noticia) {
        return res.status(404).send("Notícia não encontrada.");
    }

    const comentariosDaNoticia = todosComentarios.filter(c => c.noticiaId === noticiaId);
    const numNotifications = todosComentarios.filter(c => c.denunciado).length; 

    res.render('noticia', {
        noticia: {
            ...noticia,
            conteudo: noticia.conteudo 
        },
        comentarios: comentariosDaNoticia,
        usuario: req.session.usuario, 
        numNotifications: numNotifications 
    });
});

app.get('/nova-noticia', (req, res) => {
    res.render('nova-noticia', { categorias });
});

app.post('/salvar-noticia', (req, res) => {
    const { titulo, autor, categoria, conteudo } = req.body;
    const dataAtual = new Date().toLocaleDateString('pt-BR');
    const newId = todasNoticias.length > 0 ? Math.max(...todasNoticias.map(n => n.id)) + 1 : 1;

    todasNoticias.push({
        id: newId,
        titulo,
        autor: autor, 
        categoria,
        resumo: conteudo.substring(0, 100) + '...',
        imagemUrl: '/images/default.jpg', 
        data: dataAtual,
        conteudo: conteudo,
        status: "Publicado"
    });

    res.redirect('/dashboard');
});

app.get('/editar-noticia/:id', (req, res) => {
    const noticiaId = parseInt(req.params.id);
    const noticia = todasNoticias.find(n => n.id === noticiaId);

    if (!noticia) {
        return res.status(404).send("Notícia não encontrada.");
    }

    res.render('editar-noticia', { noticia, categorias });
});

app.post('/atualizar-noticia/:id', (req, res) => {
    const noticiaId = parseInt(req.params.id);
    const { titulo, autor, categoria, conteudo } = req.body;

    const noticia = todasNoticias.find(n => n.id === noticiaId);

    if (!noticia) {
        return res.status(404).send("Notícia não encontrada.");
    }
    noticia.titulo = titulo;
    noticia.autor = autor;
    noticia.categoria = categoria;
    noticia.resumo = conteudo.substring(0, 100) + '...';
    noticia.conteudo = conteudo; 

    res.redirect('/dashboard'); 
});

app.get('/comentarios', (req, res) => {
    if (!req.session.usuario || req.session.usuario.email !== 'admin@newsstream.com') {
        return res.status(403).send("Acesso não autorizado.");
    }

    const comentariosDenunciados = todosComentarios.filter(c => c.denunciado === true);

    res.render('comentarios', { comentariosDenunciados });
});

app.post('/remover-comentario/:id', (req, res) => {
    const comentarioId = parseInt(req.params.id);
    todosComentarios = todosComentarios.filter(c => c.id !== comentarioId);
    res.redirect('/comentarios'); 
});

app.get('/usuarios', (req, res) => {
    if (!req.session.usuario || req.session.usuario.email !== 'admin@newsstream.com') {
        return res.status(403).send("Acesso não autorizado.");
    }

    db.all("SELECT id, nome, email FROM usuarios", [], (err, usuariosCadastrados) => {
        if (err) {
            console.error("Erro ao buscar usuários:", err);
            return res.status(500).send("Erro ao carregar usuários.");
        }
        res.render('usuarios', { usuariosCadastrados });
    });
});

app.post('/remover-usuario/:id', (req, res) => {
    const usuarioId = parseInt(req.params.id);

    db.run("DELETE FROM usuarios WHERE id = ?", [usuarioId], function(err) {
        if (err) {
            console.error("Erro ao remover usuário:", err.message);
            return res.status(500).send(`Erro ao remover usuário: ${err.message}`);
        }
        console.log(`Usuário ID ${usuarioId} removido com sucesso.`);
        res.redirect('/usuarios'); 
    });
});

app.get('/noticias', (req, res) => {
    if (!req.session.usuario || req.session.usuario.email !== 'admin@newsstream.com') {
        return res.status(403).send("Acesso não autorizado.");
    }

    const noticiasDenunciadas = todasNoticias.filter(noticia => noticia.denunciado === true);

    res.render('noticias-admin', {
        todasNoticias: noticiasDenunciadas, 
        nome: req.session.usuario.nome
    });
});

app.post('/remover-noticia/:id', (req, res) => {
    const noticiaId = parseInt(req.params.id);

    const indexParaRemover = todasNoticias.findIndex(n => n.id === noticiaId);
    if (indexParaRemover !== -1) {
        todasNoticias.splice(indexParaRemover, 1);
        console.log(`Notícia ID ${noticiaId} removida do array em memória.`);
    } else {
        console.warn(`Notícia ID ${noticiaId} não encontrada no array em memória.`);
    }

    res.redirect('/dashboard'); 
});

app.get('/categorias', (req, res) => {
    if (!req.session.usuario || req.session.usuario.email !== 'admin@newsstream.com') {
        return res.status(403).send("Acesso não autorizado.");
    }

    const mensagem = req.session.mensagem;
    const sucesso = req.session.sucesso;

    if (req.session.mensagem) {
        delete req.session.mensagem;
    }
    if (req.session.sucesso !== undefined) {
        delete req.session.sucesso;
    }

    res.render('categorias', { categorias, mensagem, sucesso });
});

app.post('/adicionar-categoria', (req, res) => {
    if (!req.session.usuario || req.session.usuario.email !== 'admin@newsstream.com') {
        return res.status(403).send("Acesso não autorizado.");
    }

    const { novaCategoriaNome } = req.body;

    if (!novaCategoriaNome || novaCategoriaNome.trim() === '') {
        req.session.mensagem = 'O nome da categoria não pode ser vazio.';
        req.session.sucesso = false;
        return res.redirect('/categorias');
    }

    const categoriaExistente = categorias.some(cat => cat.toLowerCase() === novaCategoriaNome.trim().toLowerCase());

    if (categoriaExistente) {
        req.session.mensagem = `A categoria "${novaCategoriaNome}" já existe.`;
        req.session.sucesso = false;
        return res.redirect('/categorias');
    }

    categorias.push(novaCategoriaNome.trim());
    categorias.sort((a, b) => a.localeCompare(b));

    req.session.mensagem = `Categoria "${novaCategoriaNome}" adicionada com sucesso!`;
    req.session.sucesso = true;
    res.redirect('/categorias');
});

app.post('/remover-categoria', (req, res) => {
    if (!req.session.usuario || req.session.usuario.email !== 'admin@newsstream.com') {
        return res.status(403).send("Acesso não autorizado.");
    }

    const { categoriaParaRemover } = req.body;

    if (!categoriaParaRemover || categoriaParaRemover.trim() === '') {
        req.session.mensagem = 'Nome da categoria inválido para remoção.';
        req.session.sucesso = false;
        return res.redirect('/categorias');
    }

    const index = categorias.indexOf(categoriaParaRemover.trim());

    if (index !== -1) {
        categorias.splice(index, 1);
        req.session.mensagem = `Categoria "${categoriaParaRemover}" removida com sucesso!`;
        req.session.sucesso = true;
        console.log(`Categoria '${categoriaParaRemover}' removida.`);
    } else {
        req.session.mensagem = `Categoria "${categoriaParaRemover}" não encontrada.`;
        req.session.sucesso = false;
        console.warn(`Tentativa de remover categoria não existente: '${categoriaParaRemover}'`);
    }

    res.redirect('/categorias');
});

app.post('/editar-categoria', (req, res) => {
    if (!req.session.usuario || req.session.usuario.email !== 'admin@newsstream.com') {
        return res.status(403).send("Acesso não autorizado.");
    }
    const { categoriaAtual, novaCategoria } = req.body;

    if (!novaCategoria.trim()) {
        req.session.mensagem = "O nome da categoria não pode estar vazio.";
        req.session.sucesso = false;
        return res.redirect('/categorias');
    }

    const index = categorias.indexOf(categoriaAtual);
    if (index !== -1) {
        categorias[index] = novaCategoria; 
        req.session.mensagem = `Categoria "${categoriaAtual}" alterada para "${novaCategoria}" com sucesso!`;
        req.session.sucesso = true;
        console.log(`Categoria '${categoriaAtual}' alterada para '${novaCategoria}'`);
    } else {
        req.session.mensagem = `Categoria "${categoriaAtual}" não encontrada para edição.`;
        req.session.sucesso = false;
        console.warn(`Tentativa de editar categoria não existente: '${categoriaAtual}'`);
    }

    res.redirect('/categorias'); 
});

app.post('/comentar/:id', (req, res) => {
    const noticiaId = parseInt(req.params.id);
    const textoComentario = req.body.comentario;
    const autorComentario = req.session.usuario ? req.session.usuario.nome : "Anônimo";

    const newCommentId = todosComentarios.length > 0
        ? Math.max(...todosComentarios.map(c => c.id)) + 1
        : 1;

    const novoComentario = {
        id: newCommentId,
        autor: autorComentario,
        texto: textoComentario,
        data: new Date().toLocaleDateString('pt-BR'),
        noticiaId: noticiaId, 
        denunciado: false, 
        motivoDenuncia: null, 
        detalhesDenuncia: null 
    };

    todosComentarios.push(novoComentario); 

    res.redirect(`/noticias/${noticiaId}`);
});

app.get('/denunciar-comentario/:noticiaId/:comentarioId', (req, res) => {
    const noticiaId = parseInt(req.params.noticiaId);
    const comentarioId = parseInt(req.params.comentarioId);

    let comentarioEncontrado = todosComentarios.find(c =>
        c.noticiaId === noticiaId && c.id === comentarioId
    );

    if (!comentarioEncontrado) {
        return res.status(404).send("Comentário não encontrado para denúncia.");
    }

    res.render('denunciar', {
        comentarioDenunciado: comentarioEncontrado.texto,
        noticiaId: noticiaId,
        comentarioId: comentarioId
    });
});

app.post('/denunciar-comentario/:noticiaId/:comentarioId', (req, res) => {
    const { noticiaId, comentarioId } = req.params;
    const { motivo, detalhes } = req.body; 

    let comentarioDenunciado = todosComentarios.find(c =>
        c.noticiaId === parseInt(noticiaId) && c.id === parseInt(comentarioId)
    );

    if (comentarioDenunciado) {
        comentarioDenunciado.denunciado = true;
        comentarioDenunciado.motivoDenuncia = motivo; 
        comentarioDenunciado.detalhesDenuncia = detalhes; 
        console.log(`Comentário ID ${comentarioId} da notícia ID ${noticiaId} denunciado. Motivo: ${motivo}, Detalhes: ${detalhes || 'Nenhum'}`);
    } else {
        console.warn(`Tentativa de denunciar comentário não encontrado: Notícia ID ${noticiaId}, Comentário ID ${comentarioId}`);
    }

    res.render('denuncia-confirmada'); 
});

app.get('/denunciar-noticia/:id', (req, res) => {
    const noticiaId = parseInt(req.params.id);
    const noticia = todasNoticias.find(n => n.id === noticiaId); 

    if (!noticia) return res.status(404).send("Notícia não encontrada para denúncia.");
    res.render('denunciar-noticia', { noticia });
});

app.post('/denunciar-noticia/:id', (req, res) => {
    const noticiaId = parseInt(req.params.id);
    const { motivo, detalhes } = req.body; 

    let noticiaDenunciada = todasNoticias.find(n => n.id === noticiaId);

    if (noticiaDenunciada) {
        noticiaDenunciada.denunciado = true; 
        noticiaDenunciada.motivoDenuncia = motivo;
        noticiaDenunciada.detalhesDenuncia = detalhes;
        console.log(`Notícia ID ${noticiaId} denunciada. Motivo: ${motivo || 'N/A'}, Detalhes: ${detalhes || 'Nenhum'}`);
    } else {
        console.warn(`Tentativa de denunciar notícia não encontrada: ID ${noticiaId}`);
    }

    res.render('denuncia-confirmada'); 
});

app.get('/dashboard', (req, res) => {
    if (!req.session.usuario || req.session.usuario.email !== 'admin@newsstream.com') {
        return res.status(403).send("Acesso não autorizado.");
    }

    const noticiasPorCategoria = categorias.map(c => ({
        categoria: c,
        total: todasNoticias.filter(n => n.categoria === c).length
    }));

    res.render('dashboard', {
      totalUsuarios: 5, 
      totalNoticias: todasNoticias.length,
      categorias: noticiasPorCategoria,
      todasNoticias: todasNoticias,
      totalComentarios: todosComentarios.filter(c => c.denunciado).length, 
      numNotifications: todosComentarios.filter(c => c.denunciado).length 
  });
});

app.use(require('./routes/login'));

app.get('/logout', (req, res) => {
    req.session.destroy(() => res.redirect('/login')); 
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
