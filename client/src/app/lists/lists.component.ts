import { HttpClient } from '@angular/common/http';
import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { compact } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { VirtualTimeScheduler } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { OnlyW } from '../_models/onlyW';
import { User } from '../_models/user';
import { Word } from '../_models/word';
import { AccountService } from '../_services/account.service';
import { MembersService } from '../_services/members.service';


@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  baseUrl = environment.apiUrl;
  @Output() cancelRegister = new EventEmitter();
  model: Word;
  sendthis:Word;
  user:User;
  exc:string[]=["i","you","we","they","he ","she","it","am","is","are","do","not","\u2013","&","\/","\/kg","\/p","@","\u2018Try","\u00a3","\u00a33","\u00a9","\u2022","10","11","12","13","14","15","16","17","18","19","20","2012","21","23","24","25","26","27","28","29","30","6","60","7","8","9","a","a\/an","able","about","above","Accessories","accident","ache","across","act","activity","actor","actually","ad","add","address","adj","adj,","adjectives","adult","adv","adv,","advanced","adventure","advertisement","advice","aero","aeroplane","afraid","after","afternoon","afterwards","again","against","age","aged","ago","agree","agree,","air","airport","alarm","album","all","almost","alone","along","already","alright","also","always","Am","amazing","ambulance","among","an","and","angry","animal","animals","Anna","Anne,","another","answer","any","anybody","anymore","anyone","anything","anyway","anywhere","apartment","apple","appointment","Are","area","arm","armchair","around","arrive","arrived","art","article","artist","as","ask","assistant","at","ate","attractive","aunt","autumn","av","available","away","awful","B","baby","baby\u2019s","back","backpack","bad","badly","badminton","bag","bake","ball","balloon","banana","band","bandage","bank","bank\u2019s","barbecue","baseball","basketball","bat","bath","bathing","bathroom","bathtub","battery","be","beach","bean","bear","beard","beautiful","because","become","bed","bedroom","bedrooms","bee","before","begin","beginner","beginning","behind","believe","belong","below","belt","beside","best","better","between","bicycle","big","bigger","bike","bill","bill,","biology","bird","birth","birthday","biscuit","bit","black","black\/white","blackboard","blanket","block","blond","blood","blouse","blue","board","boat","body","boil","boiled","book","book\u2019s","bookcase","books","bookshelf","bookshop","bookstore","boot","boots","bored","boring","born","borrow","borrowed","boss","both","bother","bottle","bottom","bowl","box","boy","boyfriend","Br","bracelet","brain","brave","bread","break","breakfast","bridge","bright","brilliant","bring","broken","brother","brown","brush","build","building","Buildings","burger","bus","business","businessman","businesswoman","busy","but","butter","buy","by","bye","C","cabinet","cafe","caf\u00e9","cafe\/caf\u00e9","cafeteria","cake","cake,","calendar","call","called","came","camel","camera","camp","camping","campsite","Can","can","candy","cannot","cap","capital","car","card","career","careful","carefully","carpet","carrot","carry","cartoon","case","cash","castle","cat","catch","cathedral","CD","ceiling","cell","cent","centimeter","centimetre","centimetre\/centimeter","centre","centre\/center","century","cereal","certainly","chain","chair","change","changed","channel","chat","chatroom","cheap","check","cheese","chef","chemist","chemistry","cheque","chess","chicken","child","chilli","chips","chocolate","choose","cinema","circle","circus","city","class","classical","classmate","classroom","clean","cleaner","clear","clearly","clever","click","climb","climbing","clock","close","closed","clothes","cloud","cloudy","clown","club","cm","coach","coat","coffee","cola","cold","colleague","collect","college","colour","Colours","com","comb","come","comfortable","comic","Communication","company","competition","complete","computer","concert","congratulations","conj","contact","conversation","cook","cooker","cookie","cooking","cool","copy","corner","correct","cost","costume","could","country","countryside","course","cousin","cover","cow","crazy","cream","credit","cricket","cross","crossing","crowd","crowded","cry","crying","cup","cupboard","curry","curtain","customer","cut","cycle","cycling","D","dad","daily","dance","dancer","dancing","danger","dangerous","dark","date","daughter","david@cambridgeesol","day","dead","dear","December","decide","deep","degree","degrees","delay","delayed","dentist","department","describe","desert","desk","dessert","det","det,","detail","diary","dictionary","didn\u2019t","die","difference","different","difficult","digital","dining","dinner","dinosaur","diploma","dirty","disco","discount","discuss","dish","do","doctor","document","Documents","doesn\u2019t","dog","doll","dollar","dolphin","don\u2019t","door","dot","double","down","download","downloaded","downstairs","Dr","draw","drawer","drawing","dream","dress","dressed","drink","drive","driver","driving","driving\/driver\u2019s","drugstore","drum","dry","duck","during","DVD","dy","e","each","ear","early","earn","earring","easily","east","easy","eat","Education","egg","electric","electricity","elephant","elevator","else","email","empty","end","Eng","engine","engineer","England","enjoy","enough","enter","Entertainment","entrance","envelope","eraser","especially","euro","even","evening","ever","every","everybody","everyone","everything","everywhere","exactly","exam","examination\/exam","example","excellent","except","excited","exciting","exclam","excuse","exercise","exhibition","exit","expensive","Experiences","explain","explore","explorer","explorers","extra","eye","F","face","fact","factory","fail","fair","fall","family","famous","fan","fantastic","far","farm","farmer","fashion","fast","fat","father","favourite","feel","Feelings,","fell","felt","festival","few","field","file","fill","film","final","finally","find","fine","fine,","finger","finish","fire","first","First\u2026","fish","fishing","fit","flat","flight","floor","flower","fly","fog","foggy","follow","food","foot","football","footballer","for","foreign","forest","forget","forgot","fork","form","found","France","free","French","fresh","fridge","fried","friend","friendly","Friends","fries","from","front","fruit","full","fun","funny","furniture","further","future","G","game","garage","garden","garlic","gas","gate","geography","get","gift","girl","girlfriend","give","glad","glass","glasses","glove","go","goal","going","gold","golden","golf","gone","good","goodbye","got","grade","gram","grand","grandchild","granddaughter","grandfather","grandma","grandmother","grandpa","grandparent","grandson","granny","grape","graph","grass","gray","great","green","grey","grilled","grocery","group","grow","guess","guest","guide","guidebook","guitar","guy","gym","H","hair","half","hall","hand","handbag","happen","happy","hard","has","hat","hate","have","He","He\u2019s","head","headache","headteacher","health","Health,","healthy","hear","heart","heating","heavy","helicopter","hello","help","her","here","hers","herself","hey","hi","high","hill","him","himself","hip","his","history","hit","Hobbies","hobby","hockey","hold","holiday","holidays","home","homework","honey","hop","hope","horrible","horse","hospital","hot","hotel","hour","hours","house","housewife","How","however","hungry","hurry","hurt","hurts","husband","I","I\u2019d","I\u2019ll","I\u2019m","I\u2019ve","ice","ID","idea","identification","if","if\u2026","ill","immediately","important","improve","in","ination","include","including","indoor","indoors","information","insect","inside","instead","instructions","instrument","interested","interesting","international","internet","into","invitation","invite","is","island","isn\u2019t","it","It\u2019s","its","itself","J","jacket","jam","January","jazz","jeans","jewellery","jewelry","job","Jobs","John","join","journalist","journey","juice","July","jump","jumper","Just","K","keep","KET","key","keyboard","kg","kick","kilo","kilogram","kilogramme","kilometer","kilometre","kilometre\/km\/kilometer","kilometres","kind","king","kiss","kit","kitchen","kite","km","knife","know","known","L","lake","lamp","language","laptop","large","last","late","later","latest","laugh","lazy","learn","least","leather","leave","leaves","left","leg","Leisure","lemon","lemonade","lend","less","lesson","let","letter","level","library","licence","lie","life","lift","light","lights","like","line","lion","List","listen","liter","litre","little","live","Liverpool","living","ll","London","long","Look","looking","lorry","lose","lost","lot","lots","loud","love","lovely","low","luck","lucky","luggage","lunch","lunchtime","m","machine","mad","magazine","mail","main","make","man","manager","Manchester","mango","many","map","mark","market","married","match","math","maths\/mathematics","matter","May","maybe","me","meal","meals","mean","Measurements","meat","mechanic","Media","medicine","meet","meeting","melon","member","memory","menu","message","meter","metre","midday","middle","midnight","might","mile","milk","million","mind","mine","mineral","minus","minute","mirror","Miss","missing","mistake","mix","mobile","model","modern","moment","Monday","money","monkey","month","monthly","moon","more","morning","most","mother","motorbike","motorway","mountain","mouse","mouth","move","movie","MP3","Mr","Mrs","Ms","much","much,","mug","mum","museum","mushroom","music","musical","musician","must","mv","My","myself","n","n,","name","national","nationality","Natural","nature","near","nearly","neck","necklace","need","neighbour","net","Never","new","news","newspaper","next","nice","night","no","nobody","noise","noisy","noon","normal","north","nose","not","note","notebook","nothing","notice","now","number","nurse","O","o\u2019clock","occupation","of","off","offer","office","officer","often","oh","oil","OK\/okay","old","omelette","on","once","one","onion","online","only","open","opera","Opinions","opposite","or","orange","order","org","other","our","ours","ourselves","out","outdoors","outside","over","own","P","pack","Page","pain","paint","painter","painting","pair","pale","paper","pardon","parent","park","parking","part","partner","party","pass","passenger","passport","past","past\/to","pasta","path","pay","PC","pear","pen","pence","pencil","penfriend","penny","people","pepper","per","perfect","perfume","perhaps","person","personal","pet","petrol","pharmacy","phone","photo","photograph","photographer","photography","photos","phr","physics","piano","pick","picnic","picture","piece","pillow","pilot","pink","pity","pizza","pl","place","Places","plan","plane","plant","plastic","plate","platform","play","player","playground","pleasant","please","pleased","plus","pocket","point","police","polite","pool","poor","pop","popular","possible","possibly","post","postcard","poster","potato","pound","practice","practise","prefer","prep","prepare","present","pretty","price","print","printer","prize","probably","problem","program","programme","project","pron","pull","pupil","purple","purse","push","put","puzzle","Q","quarter","queen","question","quick","quickest","quickly","quiet","quite","quiz","R","rabbit","race","raced","racket","radio","railway","rain","raincoat","rainforest","rap","read","reading","ready","real","really","reason","receipt","receive","receptionist","record","red","refrigerator","remember","rent","repair","repeat","rest","rest\u2019,","restaurant","return","returned","rice","rich","ride","riding","right","right\/alright","ring","river","road","roast","rock","roof","room","round","roundabout","rubber","rugby","ruler","run","runner","running","S","sad","safe","said","sail","sailing","salad","sale","salt","Sam","same","sandwich","sauce","sausage","save","say","scarf","school","schoolchild","science","scissors","scooter","screen","sea","seat","second","secretary","see","seen","sell","send","sentence","serve","Services","set","several","Shall","shame","shampoo","share","She","sheep","sheet","shelf","ship","shirt","shoe","shoes","shop","shopper","shopping","short","shorts","should","shout","show","shower","shut","sick","side","sightseeing","sign","silver","simple","since","sing","singer","singing","single","sink","sister","sit","site","sitting","size","skate","skateboard","skateboarding","skating","ski","skiing","skirt","sky","sleep","slice","slim","slow","slowly","small","smoke","smoking","snack","snow","snowboard","snowboarding","so","So,","soap","soccer","sock","sofa","soft","software","some","somebody","someone","Someone\u2019s","something","sometimes","somewhere","son","song","songs","soon","sorry","Sorry,","sort","sound","sounds","soup","south","space","spare","speak","speaker","special","spell","spelling","spend","spoon","sport","sports","spring","square","stadium","staff","stage","stairs","stamp","Stand","standing","star","start","station","stay","steak","steal","still","stolen","stomach","stop","store","storm","story","straight","strange","street","strong","student","studies","study","subject","such","suddenly","sugar","suit","suitcase","summer","sun","Sunday","sunglasses","sunny","supermarket","supper","suppose","sure","surf","surfboard","surfboarding","surfing","surname","surprise","surprised","swam","sweater","sweet","swim","swimming","swimsuit","T","table","Take","takes","talk","tall","taxi","tea","teach","teacher","teacher\u2019s","team","Technology","teenager","telephone","television","tell","temperature","temperature\u2019s","tennis","tent","term","terrible","test","text","textbook","Texts","than","thank","thanks","that","That\u2019s","The","theater","theatre","their","theirs","them","themselves","then","then\u2026","There","these","They","thin","thing","think","third","thirsty","this","those","thought","three","through","throw","thunderstorm","ticket","tidy","tie","tiger","tights","till","time","timetable","tire","tired","to","toast","today","toe","together","toilet","Tom","tomato","tomorrow","tonight","too","took","tooth","toothache","toothbrush","top","total","tour","tourist","towel","town","toy","traffic","train","trainer","trainers","tram","Transport","travel","tree","trip","trouble","trousers","true","try","tub","turn","TV","twice","two","type","tyre","U","UCLES","umbrella","uncle","under","underground","understand","unfortunately","unhappy","uniform","United","university","until","unusual","up","upset","upstairs","urt","us","Use","useful","usual","usually","v","v\/versus","variety","various","vegetable","versus","very","video","view","village","violin","visit","visitor","Vocabulary","volleyball","W","wait","waiter","waiter\/","waiting","waitress","wake","walk","walked","walking","wall","wallet","want","wanted","warm","was","wash","washing","watch","watched","water","way","We","wear","wearing","weather","web","website","week","weekday","weekend","weekly","welcome","well","west","wet","What","What\u2019s","wheel","When","where","which","while","white","who","whole","why","wide","wife","wild","will","win","wind","window","windsurfing","windy","winner","winter","wish","wishes","with","without","woman","wonderful","wood","wooden","wool","word","work","worker","working","world","worried","worry","worse","worst","would","wow","write","writer","writing","wrong","Y","yeah","year","yellow","yes","Yes,","yesterday","yet","yog","yoghurt","you","you\u2019re","young","your","yours","yourself","Z","zero","zoo"];
  textarea: string;
  separators = ['0', '1','2','3','4','5','6','7','8','9',' ','%','&','-','*','/','#','$', '?', '!', '.', ',' ,';', ':', '-', '(', ')', '[', ']', '}', '{', '\t', '\n', '\'', '\"', '\\', '\0', '\a', '\b','\f','\n','\t','\v'];
  wordsChars:string[];
  wordsWords:string[];
  filterword:string;
  txtdata:string;
  forstring:string;
  gotWords:Word[];
  index:number;
  removeD:string[];
  userKnownWords:OnlyW[];
  constructor(public accountService: AccountService,private http: HttpClient,private memberService:MembersService, private toastr:ToastrService) { }

  ngOnInit(): void {this.getCurrent(); }

  addWords(word1:string,id1:number,known1:boolean) {
    this.sendthis =
    {
      userId:id1,
      known:known1,
      word:word1
    }
    this.http.post(this.baseUrl+'words/save',this.sendthis).subscribe(res =>{
      console.log(res);
      this.toastr.info(word1+" is saved to known words list");
      this.wordsWords = this.wordsWords.filter(data => !(data.includes(word1)) ) 
    },error =>{
      console.log(error);
      this.toastr.error(word1+" is already saved to known words list");
      this.wordsWords = this.wordsWords.filter(data => !(data.includes(word1)) )
    }
    )
  }

  getText(textarea)
  { 
    this.setKnownWords();
    this.textarea=textarea;
    this.textarea.toLowerCase();
    this.textareaIcorrect();
    this.splitMulti(textarea);
    this.removeDuplicate();
    this.filterwords();
    
  }

  
 splitMulti(str:string){
  
 this.wordsChars = str.split(" ").join(",")
 .split("1").join(",")
 .split("2").join(",")
 .split("3").join(",")
 .split("4").join(",")
 .split("5").join(",")
 .split("6").join(",")
 .split("7").join(",")
 .split("8").join(",")
 .split("9").join(",")
 .split("0").join(",")
 .split("%").join(",")
 .split("-").join(",")
 .split("-").join(",")
 .split("&").join(",")
 .split("*").join(",")
 .split("/").join(",")
 .split("#").join(",")
 .split("$").join(",")
 .split("?").join(",")
 .split("!").join(",")
 .split(".").join(",")
 .split(",").join(",")
 .split(";").join(",")
 .split(":").join(",")
 .split("(").join(",")
 .split(")").join(",")
 .split("]").join(",")
 .split("[").join(",")
 .split("{").join(",")
 .split("}").join(",")
 .split("\t").join(",")
 .split("\n").join(",")
 .split("\"").join(",")
 .split("\\").join(",")
 .split("\0").join(",")
 .split(".").join(",")
 .split(",").join(",")
 .split(","); //istenilen karakterler bunun içine yazılır  .split(" ").join(",")  
    console.log(this.wordsChars);
}
 filterwords()
 {
   this.checkThereIs();
   this.deleteNulls();
 }
 
 checkThereIs(){
  for( this.forstring in this.exc)
  {
    this.index=this.wordsChars.indexOf(this.exc[this.forstring]);
    if(this.index>-1)
    {
      this.wordsChars.splice(this.index,1);
    }
  }
  this.wordsWords=this.wordsChars
  console.log(this.wordsWords);
 }

 deleteNulls(){
  for(var x in this.wordsWords){
    if(this.wordsWords[x]=="")
    this.index= this.wordsWords.indexOf(this.wordsWords[x])
    if(this.index>-1)
    {
      this.wordsWords.splice(this.index,1);
    }
  }
  console.log(this.wordsWords);
 }
 textareaIcorrect()
 {
  this.textarea.replace("I","i");
  this.textarea.replace("ı","i");
 }
 removeDuplicate()
 {
   for (var x in this.wordsChars)
   {
     for(var y in this.removeD)
     {
       if(!(this.wordsChars[x]==this.removeD[y]))
       {
         this.removeD.push(this.wordsChars[x]);
       }
     }
   }
  this.wordsWords== this.removeD;
 }

 setKnownWords(){
  this.http.get<OnlyW[]>(this.baseUrl+'words/knownOnlyWords/'+this.user.id).subscribe(words =>
    {
     this.userKnownWords =words;
     console.log(this.userKnownWords);
    });

    for(var x in this.userKnownWords)
    {
      this.exc.push(this.userKnownWords[x].word)
      console.log(this.userKnownWords[x]);
    }
   console.log(this.exc);
 }
 getCurrent(){
  this.accountService.currentUser$.subscribe(user =>{this.user=user})
 }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
