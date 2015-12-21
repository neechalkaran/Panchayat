function automationverification()
{
var mySheet = SpreadsheetApp.openById("1cyj600VrXRmo347kyHNcRzk4r-5SEqrNrdyWNZpR_I0").getSheetByName("Sheet1");
var start=mySheet.getRange(1,1).getValue();
var end=12520;
for(var orow=start;orow<=end;orow++)
{
var title = namecon(mySheet.getRange(orow, 1).getValue()) + " ஊராட்சி";
var testurl = "http://ta.wikipedia.org/w/index.php?action=raw&title="+title;
try{var cont =UrlFetchApp.fetch(testurl).getContentText();//if the artice is not present it throws error
if(cont.length>50){mySheet.getRange(orow, 32).setValue(title);
                       mySheet.getRange(1,1).setValue(orow);
if(cont.search("பகுப்பு:த. இ. க. ஊராட்சித் திட்ட")>-1)mySheet.getRange(orow, 15).setValue("Suceeed");                      
}
   }catch(e){Logger.log(e.toString());}
}
}


function createarticle(orow, content) {
var mySheet = SpreadsheetApp.openById("1cyj600VrXRmo347kyHNcRzk4r-5SEqrNrdyWNZpR_I0").getSheetByName("Sheet1");
var enname =namecon(mySheet.getRange(orow, 2).getValue());
var taname =namecon(mySheet.getRange(orow, 1).getValue());

var title = taname + " ஊராட்சி"
var testurl = "http://ta.wikipedia.org/w/index.php?action=raw&title="+title;
try{if(UrlFetchApp.fetch(testurl).getContentText()!=""){mySheet.getRange(orow, 32).setValue(title);
                                                        mySheet.getRange(1,1).setValue(orow);return;}}catch(e){}

var test =taname.replace(RegExp("[ஂ-௺0-9. ]+","gi"),"");
if(test.length>0)return;
if(mySheet.getRange(orow, 5).getValue().search(",")>-1)return;

var district=mySheet.getRange(orow, 4).getValue();
var habit = habitit(mySheet.getRange(orow, 25).getValue());
var tnrdjson={"graveyard":13,"busstand":19,"vilroads":20,"unionroads":23,
"market":22,"playground":14,"ponds":17,"schools":26,"buildings":24,"glreservoir":29,"overheadtank":21,
"handpump":28,"minipowerpump":18,"waterpump":27,"population":7,"femalecount":9,"malecount":8,
"dfemalecount":12,"dmalecount":11,"dpopulation":10,"dname":4,"pcname":5,"ref":30};
for(v in tnrdjson)
{
content=content.replace(RegExp("\\<!--tnrd-"+v+"--\\>[0-9ஂ-௺ ]+\\<!--tnrd-"+v+"--\\>","gi"),"<!--tnrd-"+v+"-->"+mySheet.getRange(orow, tnrdjson[v]).getValue()+"<!--tnrd-"+v+"-->");
}
content=content.replace(RegExp("\\<!--tnrd-bname--\\>[0-9ஂ-௺ ]+\\<!--tnrd-bname--\\>","gi"),"<!--tnrd-bname-->"+namecon(mySheet.getRange(orow, 6).getValue())+"<!--tnrd-bname-->");

var acname=mySheet.getRange(orow, 3).getValue();
if(acname.search(",")>-1){
var acsname=acname.split(",");
content=content.replace(RegExp("\\<!--tnrd-acname--\\>[ஂ-௺]+\\<!--tnrd-acname--\\>","gi"),"<!--tnrd-acname1-->"+acsname[0]+"<!--tnrd-acname1-->");
content=content.replace(RegExp("\\<!--tnrd-acname1--\\>]]","gi"),"<!--tnrd-acname1-->]] மற்றும் \[\[<!--tnrd-acname2-->"+acsname[1]+"<!--tnrd-acname2--> (சட்டமன்றத் தொகுதி)|<!--tnrd-acname2-->"+acsname[1]+"<!--tnrd-acname2-->\]\]");
}
else{
content=content.replace(RegExp("\\<!--tnrd-acname--\\>[ஂ-௺]+\\<!--tnrd-acname--\\>","gi"),"<!--tnrd-acname-->"+acname+"<!--tnrd-acname-->");}
content=content.replace(RegExp("\\<!--taname--\\>[ஂ-௺]+\\<!--taname--\\>","gi"),taname);
content=content.replace(RegExp("\\<!--enname--\\>[a-zA-Z ]+\\<!--enname--\\>","gi"),enname);
content=content.replace(RegExp("\\<!--dname--\\>[ஂ-௺]+\\<!--dname--\\>","gi"),district);
content=content.replace(RegExp("\\<!--tnrd-habit--\\># [ஂ-௺\n \\#]+\\<!--tnrd-habit--\\>","gi"),"<!--tnrd-habit-->"+habit+"<!--tnrd-habit-->");

content=content.replace(RegExp("\\<!--tnrd-area--\\>[0-9.]+\\<!--tnrd-area--\\>","gi"),"");
var vidai = writewiki( "ta", title ,content,"[[விக்கிப்பீடியா:தானியங்கிக் கட்டுரையாக்கம்/தமிழக ஊராட்சிகள்|தமிழக ஊராட்சிக்]] கட்டுரை உருவாக்கம்","","");
mySheet.getRange(orow, 15).setValue(vidai);
mySheet.getRange(1,1).setValue(orow);

}
function habitit(data)
{
//data=data.replace(RegExp(),"")
var kuk = data.split(",");
var res="";
for(i in kuk){res+="# "+kuk[i]+"\n"}
return res;

}
function namecon(name)
{
name=name.replace(/\n/gi,"");
name=name.replace(/\./gi,". ");
name=name.replace(/  /gi," ");
name=name.replace(/  /gi," ");
name=name.replace(/  /gi," ");
name=name.trim();
return name;
}

function templatecreation()
{
var mySheet = SpreadsheetApp.openById("1cyj600VrXRmo347kyHNcRzk4r-5SEqrNrdyWNZpR_I0").getSheetByName("Sheet1");
var data = mySheet.getRange(1,1,12525,6).getValues();
var block={};
var dis ="மதுரை";
for(var i=0;i<data.length;i++)
{
if(data[i][3]==dis)
{
block[data[i][5]]=block[data[i][5]]+"&&"+data[i][0];
}
}
var name = "வார்ப்புரு:"+dis+" மாவட்ட ஊராட்சிகள்";
var result="{{navbox | listclass = hlist\n|state = collapsed\n|name  = "+dis+" மாவட்ட ஊராட்சிகள்\n|title = [["+dis+" மாவட்ட ஊராட்சிகள்]]\n|image = \n|groupstyle = line-height:1.1em;";
var j=1;
for(i in block)
{
var hab = block[i].replace("undefined&&","").split("&&");
for(k in hab)
{hab[k]="[[" + namecon(hab[k]) + " ஊராட்சி|"+  namecon(hab[k])+"]]";}//
result+="|group"+j+" = "+i+" வட்டாரம்\n|list"+j+"  = <div>"+ hab.join("{{·}}") + "</div>\n"
j+=1;
}
result+="\n}}\n<noinclude>[[பகுப்பு:தமிழ்நாடு மாவட்ட வார்ப்புருக்கள்]]</noinclude>\n[[பகுப்பு:"+dis+" மாவட்டம்]]";
var vidai = writewiki( "ta", name ,result,"மாவட்ட ஊராட்சி பட்டியல் உருவாக்கம்","","")
}
