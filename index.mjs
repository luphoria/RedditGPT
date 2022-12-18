import { ChatGPTAPIBrowser } from 'chatgpt';
import { Reddit } from './reddit.js'
const reddit = new Reddit();
const AVOID_RL = false;
const sleep = async (ms) => {
  return new Promise(resolve => {
    setTimeout(() => { resolve() }, ms);
  })
}

const reddit_topics = {
  "Gift ideas": [
    "r/GiftIdeas",
    "r/BuyItForLife",
    "r/INEEEDIT"
  ],
  "Fortnite": [
    "r/FortNiteBR",
    "r/FORTnITE",
    "r/FortniteLeaks",
    "r/FortniteCreative",
  ],
  "Christmas": [
    "r/christmas",
    "r/cookiedecorating",
    "r/ChristmasDecorating",
    "r/CozyPlaces",
  ],
  "Pokémon Scarlet & Violet": [
    "r/PokemonScarletViolet",
    "r/pokemon",
    "r/pokemongo",
    "r/PokeLeaks",
  ],
  "Call of Duty": [
    "r/ModernWarfareII",
    "r/CallOfDuty",
    "r/CODWarzone",
    "r/LivestreamFail",
  ],
  "The Witcher": [
    "r/netflixwitcher",
    "r/witcher",
    "r/Witcher3",
    "r/thewitcher3",
  ],
  // "ChatGPT": [],
  "Wall Street Bets": [
    "r/wallstreetbets",
    "r/CryptoCurrency",
    "r/stocks",
  ],
  "Houseplants": [
    "r/houseplants",
    "r/IndoorGarden",
    "r/terrariums",
    "r/plantclinic",
  ],
  "Get motivated": [
    "r/GetMotivated",
    "r/selfimprovement",
    "r/GetStudying",
    "r/DecidingToBeBetter",
  ],
  "World Cup": [
    "r/worldcup",
    "r/ussoccer",
    "r/soccer",
    "r/PremierLeague",
  ],
  "Avatar": [
    "r/Avatar",
    "r/MovieSuggestions",
    "r/Fantasy",
    "r/FanTheories",
  ],
  "Funny": [
    "r/funny",
    "r/MyPeopleNeedMe",
    "r/AnimalsBeingDerps",
    "r/holdmybeer",
  ],
  "Jokes": [
    "r/dadjokes",
    "r/funnysigns",
    "r/Jokes",
    "r/3amjokes",
  ],
  "Memes": [
    "r/memes",
    "r/me_irl",
    "r/starterpacks",
    "r/wholesomememes",
  ],
  "Interesting": [
    "r/Damnthatsinteresting",
    "r/mildlyinteresting",
    "r/Showerthoughts",
    "r/OldSchoolCool",
  ],
  "Be amazed": [
    "r/BeAmazed",
    "r/NatureIsFuckingLit",
    "r/toptalent",
    "r/nextfuckinglevel",
  ],
  "Fails": [
    "r/therewasanattempt",
    "r/yesyesyesyesno",
    "r/ImTheMainCharacter",
    "r/WatchPeopleDieInside",
  ],
  "Weird": [
    "r/blursedimages",
    "r/forbiddensnacks",
    "r/DiWHY",
    "r/mildlyinfuriating",
  ],
  "Unexpected": [
    "r/Unexpected",
    "r/nevertellmetheodds",
    "r/whatcouldgoright",
    "r/UnusualVideos",
  ],
  "Confessions & stories": [
    "r/confession",
    "r/pettyrevenge",
    "r/MaliciousCompliance",
    "r/nosleep",
  ],
  "Ask Reddit": [
    "r/AskReddit",
    "r/AmItheAsshole",
    "r/AskWomen",
    "r/AskMen",
  ],
  "Opinions": [
    "r/changemyview",
    "r/unpopularopinion",
    "r/AskReddit",
    "r/AmItheAsshole",
  ],
  "Gossip": [
    "r/Deuxmoi",
    "r/popculturechat",
    "r/blogsnark",
    "r/LivestreamFail",
  ],
  "True crime": [
    "r/TrueCrime",
    "r/UnresolvedMysteries",
    "r/TrueCrimeDiscussion",
    "r/TrueCrimePodcasts",
  ],
  "Lifehacks": [
    "r/lifehacks",
    "r/YouShouldKnow",
    "r/LifeProTips",
    "r/foodhacks",
  ],
  "Oddly satisfying": [
    "r/oddlysatisfying",
    "r/Perfectfit",
    "r/Simulated",
    "r/powerwashingporn",
  ],
  "Heartwarming": [
    "r/MadeMeSmile",
    "r/HumansBeingBros",
    "r/wholesomemes",
    "r/UpliftingNews",
  ],
  "Animals & awwws": [
    "r/aww",
    "r/AnimalsBeingBros",
    "r/babyelephantgifs",
    "r/rarepuppers",
  ],
  "Learn something": [
    "r/todayilearned",
    "r/explainlikeimfive",
    "r/dataisbeautiful",
    "r/Awwducational",
  ],
  "Space": [
    "r/space",
    "r/spaceporn",
    "r/nasa",
    "r/Futurology",
  ],
  "History": [
    "r/HistoryMemes",
    "r/AskHistorians",
    "r/100yearsago",
    "r/OldSchoolCool",
  ],
  "Nature": [
    "r/NatureIsFuckingLit",
    "r/AnimalsBeingGeniuses",
    "r/environment",
    "r/EarthPorn",
  ],
  "Science": [
    "r/science",
    "r/sciencememes",
    "r/askscience",
    "r/chemicalreactiongifs",
  ],
  "News": [
    "r/worldnews",
    "r/news",
    "r/europe",
    "r/UpliftingNews",
  ],
  "Tech": [
    "r/Futurology",
    "r/technology",
    "r/gadgets",
    "r/CryptoTechnology",
  ],
  "Gaming": [
    "r/gaming",
    "r/battlestations",
    "r/pcmasterrace",
    "r/GamePhysics",
  ],
  "Genshin Impact": [
    "r/Genshin_Impact",
    "r/Genshin_Memepact",
    "r/GenshinImpactTips",
    "r/GenshinImpact",
  ],
  "Business": [
    "r/finance",
    "r/stocks",
    "r/Economics",
    "r/Entrepreneur",
  ],
  "Stock": [
    "r/wallstreetbets",
    "r/stocks",
    "r/StockMarket",
    "r/Daytrading",
  ],
  "Personal finance": [
    "r/personalfinance",
    "r/financialindependence",
    "r/povertyfinance",
    "r/CreditCards",
  ],
  "Productivity": [
    "r/productivity",
    "r/getdisciplined",
    "r/selfimprovement",
    "r/GetStudying",
  ],
  "Career": [
    "r/careerguidance",
    "r/resumes",
    "r/recruitinghell",
    "r/jobs",
  ],
  "Studying": [
    "r/GetStudying",
    "r/college",
    "r/HomeworkHelp",
    "r/AskAcademia",
  ],
  "Family": [
    "r/Parenting",
    "r/daddit",
    "r/Mommit",
    "r/DadReflexes",
  ],
  "Relationships": [
    "r/relationship_advice",
    "r/LongDistance",
    "r/AskMen",
    "r/AskWomen",
  ],
  "Football": [
    "r/nfl",
    "r/CFB",
    "r/fantasyfootball",
    "r/footballcards",
  ],
  "Basketball": [
    "r/nba",
    "r/Basketball",
    "r/fantasybball",
    "r/CollegeBasketball",
  ],
  "Baseball": [
    "r/mlb",
    "r/baseball",
    "r/fantasybaseball",
    "r/NYYankees",
  ],
  "Soccer": [
    "r/soccer",
    "r/PremierLeague",
    "r/Bundesliga",
    "r/soccercirclejerk",
  ],
  "Boxing": [
    "r/Boxing",
    "r/MMA",
    "r/ufc",
    "r/martialarts",
  ],
  "Motor sports": [
    "r/formula1",
    "r/NASCAR",
    "r/rally",
    "r/motogp",
  ],
  "Ice hockey": [
    "r/nhl",
    "r/hockey",
    "r/fantasyhockey",
    "r/hockeyplayers",
  ],
  "Movies": [
    "r/movies",
    "r/television",
    "r/MovieDetails",
    "r/MovieSuggestions",
  ],
  "TV": [
    "r/television",
    "r/NetflixBestOf",
    "r/hbo",
    "r/Hulu",
  ],
  "Reality TV": [
    "r/popculturechat",
    "r/SellingSunset",
    "r/LoveIslandTV",
    "r/BravoRealHousewives",
  ],
  "Scifi": [
    "r/scifi",
    "r/StarWars",
    "r/startrek",
    "r/PrequelMemes",
  ],
  "Fantasy": [
    "r/Fantasy",
    "r/harrypotter",
    "r/lotrmemes",
    "r/fantasywriters",
  ],
  "Music": [
    "r/Music",
    "r/listentothis",
    "r/vinyl",
    "r/ifyoulikeblank",
  ],
  "Making music": [
    "r/WeAreTheMusicMakers",
    "r/edmproduction",
    "r/audioengineering",
    "r/Songwriters",
  ],
  "Hip-hop": [
    "r/hiphopheads",
    "r/rap",
    "r/rapbattles",
    "r/LofiHipHop",
  ],
  "Electronic music": [
    "r/EDM",
    "r/electronicmusic",
    "r/DnB",
    "r/Techno",
  ],
  "K-pop": [
    "r/kpop",
    "r/bangtan",
    "r/BlackPink",
    "r/twice",
  ],
  "Indie music": [
    "r/indieheads",
    "r/indie_rock",
    "r/IndieFolk",
    "r/indie",
  ],
  "Metal": [
    "r/Metal",
    "r/Metalcore",
    "r/progmetal",
    "r/MetalMemes",
  ],
  "Anime": [
    "r/anime",
    "r/manga",
    "r/Animesuggest",
    "r/OnePiece",
  ],
  "Anime memes": [
    "r/Animemes",
    "r/anime_irl",
    "r/animememes",
    "r/wholesomeanimemes",
  ],
  "Books": [
    "r/books",
    "r/suggestmeabook",
    "r/Fantasy",
    "r/RomanceBooks",
  ],
  "Writing": [
    "r/WritingPrompts",
    "r/writing",
    "r/Poetry",
    "r/Journaling",
  ],
  "Comics": [
    "r/Marvel",
    "r/DCcomics",
    "r/comicbooks",
    "r/Spiderman",
  ],
  "Board games": [
    "r/boardgames",
    "r/DnD",
    "r/magicTCG",
    "r/chess",
  ],
  "Art": [
    "r/Art",
    "r/learnart",
    "r/ArtPorn",
    "r/PixelArt",
  ],
  "Painting": [
    "r/painting",
    "r/Watercolor",
    "r/PourPainting",
    "r/acrylicpainting",
  ],
  "Drawing": [
    "r/drawing",
    "r/learntodraw",
    "r/redditgetsdrawn",
    "r/doodles",
  ],
  "Digital art": [
    "r/DigitalPainting",
    "r/PixelArt",
    "r/blender",
    "r/ImaginaryLandscapes",
  ],
  "Photography ": [
    "r/itookapicture",
    "r/analog",
    "r/photography",
    "r/photocritique",
  ],
  "Design": [
    "r/DesignPorn",
    "r/architecture",
    "r/web_design",
    "r/typography",
  ],
  "Programming ": [
    "r/programming",
    "r/ProgrammerHumor",
    "r/learnprogramming",
    "r/adventofcode",
  ],
  "DIY & crafts": [
    "r/somethingimade",
    "r/DIY",
    "r/crafts",
    "r/DiWHY",
  ],
  "Sewing": [
    "r/sewing",
    "r/CrossStitch",
    "r/somethingimade",
    "r/Embroidery",
  ],
  "Woodwork": [
    "r/woodworking",
    "r/BeginnerWoodWorking",
    "r/Woodcarving",
    "r/Pyrography",
  ],
  "DIY electronics ": [
    "r/electronics",
    "r/arduino",
    "r/AskElectronics",
    "r/raspberry_pi",
  ],
  "Streetwear ": [
    "r/streetwear",
    "r/Sneakers",
    "r/womensstreetwear",
    "r/japanesestreetwear",
  ],
  "Male fashion ": [
    "r/malefashionadvice",
    "r/Watches",
    "r/frugalmalefashion",
    "r/beards",
  ],
  "Female fashion": [
    "r/femalefashionadvice",
    "r/womensstreetwear",
    "r/FrugalFemaleFashion",
    "r/PetiteFashionAdvice",
  ],
  "Tattoos": [
    "r/tattoos",
    "r/TattooDesigns",
    "r/sticknpokes",
    "r/tattoo",
  ],
  "Skincare": [
    "r/SkincareAddiction",
    "r/Skincare_Addiction",
    "r/AsianBeauty",
    "r/30PlusSkinCare",

  ],
  "Makeup": [
    "r/MakeupAddiction",
    "r/BeautyGuruChatter",
    "r/BadMUAs",
    "r/Makeup",
  ],
  "Hair": [
    "r/Hair",
    "r/HaircareScience",
    "r/curlyhair",
    "r/HairDye",
  ],
  "Nails": [
    "r/Nails",
    "r/RedditLaqueristas",
    "r/NailArt",
    "r/Nailpolish",
  ],
  "Meat-lovers": [
    "r/grilling",
    "r/BBQ",
    "r/smoking",
    "r/steak",
  ],
  "Vegetarian food": [
    "r/vegetarian",
    "r/vegan",
    "r/EatCheapAndVegan",
    "r/VeganFoodPorn",
  ],
  "Healthy food": [
    "r/EatCheapAndHealthy",
    "r/nutrition",
    "r/HealthyFood",
    "r/MealPrepSunday",
  ],
  "Baking": [
    "r/Baking",
    "r/Breadit",
    "r/Sourdough",
    "r/cakedecorating",
  ],
  "Easy cooking": [
    "r/cookingforbeginners",
    "r/15minutefood",
    "r/easyrecipes",
    "r/slowcooking",
  ],
  "Budget cooking": [
    "r/budgetfood",
    "r/EatCheapAndHealthy",
    "r/EatCheapAndVegan",
    "r/foodhacks",
  ],
  "Food porn": [
    "r/FoodPorn",
    "r/food",
    "r/seriouseats",
    "r/CulinaryPlating",
  ],
  "Food humor": [
    "r/shittyfoodporn",
    "r/StupidFood",
    "r/drunkencookery",
    "r/forbiddensnacks",
  ],
  "Home improvement ": [
    "r/HomeImprovement",
    "r/homeautomation",
    "r/DIY",
    "r/Carpentry",
  ],
  "Home decorating": [
    "r/CozyPlaces",
    "r/femalelivingspace",
    "r/malelivingspace",
    "r/houseplants",
  ],
  "Gardening": [
    "r/gardening",
    "r/IndoorGarden",
    "r/landscaping",
    "r/vegetablegardening",
  ],
  "Sustainability ": [
    "r/simpleliving",
    "r/sustainability",
    "r/ZeroWaste",
    "r/minimalism",
  ],
  "Fitness ": [
    "r/Fitness",
    "r/bodyweightfitness",
    "r/crossfit",
    "r/xxfitness",
  ],
  "Gym ": [
    "r/strength_training",
    "r/bodybuilding",
    "r/homegym",
    "r/GymMemes",
  ],
  "Yoga": [
    "r/yoga",
    "r/flexibility",
    "r/Meditation",
    "r/Mindfulness",
  ],
  "Meditation ": [
    "r/Meditation",
    "r/Mindfulness",
    "r/sleep",
    "r/audiomeditation",
  ],
  "Running ": [
    "r/running",
    "r/trailrunning",
    "r/AdvancedRunning",
    "r/firstmarathon",
  ],
  "Camping & hiking": [
    "r/Outdoors",
    "r/camping",
    "r/CampingGear",
    "r/CampingandHiking",
  ],
  "Survival": [
    "r/Survival",
    "r/Bushcraft",
    "r/foraging",
    "r/WildernessBackpacking",
  ],
  "Fishing": [
    "r/Fishing",
    "r/Fishingmemes",
    "r/Fishing_Gear",
    "r/flyfishing",
  ],
  "Travel": [
    "r/TravelHacks",
    "r/travel",
    "r/backpacking",
    "r/vandwellers",
  ],
  "Cars & motor vehicles": [
    "r/cars",
    "r/motorcycles",
    "r/teslamotors",
    "r/AwesomeCarMods",
  ]
};

let prompt_text = "";
let conversation;

async function sendPrompt(msg, note) {
  if(AVOID_RL) await sleep(1000 * 40);
  console.log(`"${msg}" . . .\n`);
  if (note) console.log("// {-} " + note + "\n");
  let res = await api.sendMessage(msg, {
    onConversationResponse: (response => {
      conversation = response;
    }),
    conversationId: conversation ? conversation.conversation_id : undefined,
    parentMessageId: conversation ? conversation.message.id : undefined
  });
  console.log(`\n\n${res}\n`);
  return res;
}

const api = new ChatGPTAPIBrowser({
  email: process.env.OPENAI_EMAIL,
  password: process.env.OPENAI_PASSWORD
});

console.log("initializing api . . .");
await api.init();
console.log("api initialized.");

let character_gender = ["male", "female", "nonbinary"][Math.floor(Math.random() * 3)]; // Without our own specification, it seems to always generate a woman with similar traits.

let character_desc = await sendPrompt("Create one realistic " + character_gender + " character and describe their name, personality, and interests. Additionally, give them a simple backstory.", "creating a personality from scratch");

let character_name = await sendPrompt("Respond to this with just their first name and nothing else.", "initializing character in program for future prompts");

prompt_text = `${character_name} is creating a reddit account.\nOf these topics, which 15 would interest them the most? Answer in the form of a bulleted list.\n\n`;
for (let topic in reddit_topics) prompt_text += " * " + topic + "\n";
prompt_text += `\nInclude only the top 15 best topics for ${character_name}. Only include topics included in this list.`;
let topics_interests_raw = await sendPrompt(prompt_text)
topics_interests_raw = topics_interests_raw.split("\n");

let topics = [];
topics_interests_raw.forEach(topic => {
  if (reddit_topics[topic.replace("* ", "").replace("- ", "")]) topics.push(topic.replace("* ", "").replace("- ", ""));
});
console.log(topics);

prompt_text = `Now ${character_name} wants to join some subreddits. Of this list, which ones should they join?\nAnswer in the form of a bulleted list.\n\n`;
topics.forEach(topic => {
  reddit_topics[topic].forEach(subreddit => {
    prompt_text += "* " + subreddit + "\n";
  })
});
let subreddits_raw = await sendPrompt(prompt_text);
let subreddits = [];
subreddits_raw.split("\n").forEach(subreddit => {
  if (subreddit.startsWith("* ") || subreddit.startsWith("- ") || subreddit.startsWith("r/")) subreddits.push(subreddit.replace("* ", "").replace("- ", ""));
});

console.log("[+] Generating reddit feed . . .")
await reddit.feed(subreddits); // create reddit feed based on these interests
await sendPrompt(`From this point forward, roleplay as if you were ${character_name}. Do not break character unless I tell you to. Think: how does ${character_name} type? What is their expertise? What are their interests?`);
prompt_text = "*You open reddit.*\n\n" + await reddit.post(reddit.pos);

// TODO : include character_desc every 8 iters or so
let iters = 0;

while (true) {
  if (iters == 8) {
    prompt_text += `\n\n(Remember, Assistant: You're still roleplaying as ${character_name}.\n${character_desc})\n\n`;
    iters = 0;
  }
  iters += 1;
  prompt_text += `\nOptions:\n\`.open\`: Open post\n\`.upvote\`: Upvote post\n\`.downvote\`: Downvote post\n\`.next\`: See next post\n\n*What would ${character_name} do?*\nOnly send ${character_name}'s commands, do not send messages or explanations on the commands themselves. Only send one command at a time.`;
  let action = await sendPrompt(prompt_text);
  switch (action.replace(/`/g, "")) {
    case ".open":
      prompt_text = await reddit.open();
      let finished = false;
      while (!finished) {
        if (iters == 8) {
          prompt_text += `\n\n(Remember, Assistant: You're still roleplaying as ${character_name}.\n${character_desc})\n\n`;
          iters = 0;
        }
        iters += 1;
        prompt_text += `\nOptions:\n\`.exit\`: Exit post\n\`.comments\`: View comments on post\n\`.upvote\`: Upvote post\n\`.downvote\`: Downvote post\n\`.comment {comment}\`: Add a comment to the post\n\`.next\`: Go to next post\n\n*What would ${character_name} do?*\nOnly send ${character_name}'s commands, do not send messages or explanations on the commands themselves. Only send one command at a time.`;
        let action = await sendPrompt(prompt_text);
        switch (action.split(" ")[0].replace(/`/g, "")) {
          case ".exit":
            prompt_text = await reddit.post(reddit.pos);
            finished = true;
            break;
          case ".comments":
            prompt_text = await reddit.viewComments();
            break;
          case ".upvote":
            if (action.split(" ")[1]) {
              await reddit.upvote(action.split(" ")[1]);
            } else { await reddit.upvote() }
            prompt_text = "Post upvoted.\n"
            break;
          case ".downvote":
            if (action.split(" ")[1]) {
              await reddit.downvote(action.split(" ")[1]);
            } else { await reddit.downvote() }
            prompt_text = "Post downvoted.\n"
            break;
          case ".comment":
            action = action.split(" ");
            action.shift();
            action = action.join(" ").replace(/`/g, "");
            if (action.startsWith('"') && action.endsWith('"')) action = action.substring(1, action.length - 1);
            await reddit.postReply(action);
            prompt_text = "Comment posted.\n" + await reddit.open();
            break;
          case ".next":
            reddit.pos += 1;
            prompt_text = await reddit.post(reddit.pos);
            finished = true;
            break;
          default:
            prompt_text = "Send only one of the commands in the list. Pick only one command to send. Do not elaborate or explain why you chose that action.\n\n" + await reddit.post();
            break;
        }
      }
      break;
    case ".upvote":
      await reddit.upvote();
      prompt_text = "Post upvoted.\n" + await reddit.post(reddit.pos);
      break;
    case ".downvote":
      await reddit.downvote();
      prompt_text = "Post downvoted.\n" + await reddit.post(reddit.pos);
      break;
    case ".next":
      reddit.pos += 1;
      prompt_text = await reddit.post(reddit.pos);
      break;
    default:
      prompt_text = "Send only one of the commands in the list. Pick only one command to send. Do not elaborate or explain why you chose that action.\n\n" + await reddit.post();
      break;
  }
}