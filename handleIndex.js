// onClick();
function pageBehaviors(){
  document.querySelector('.btn-primary').addEventListener('click',function(){
    window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
    var innerHTML=''
    var isEmpty=false;
    document.querySelector('.ifInputEmpty').classList.add('d-none');
    if(document.querySelector('#usernameInput').value==''){
      innerHTML+='<label for="usernameInput">未輸入申請人名稱(點擊前往)</label><br>'
      isEmpty=true;
    }
    // if(document.querySelector('#firstProjectName').value==''){
    //   innerHTML+='<label for="firstProjectName">未輸入第一個案名(點擊前往)</label><br>'
    //   isEmpty=true;
    // }
    if(document.querySelector('#content').value==''){
      innerHTML+='<label for="content">未輸入記事本文字(點擊前往)</label><br>'
      isEmpty=true;
    }
    if(isEmpty){
      document.querySelector('.ifInputEmpty').classList.remove('d-none');
      document.querySelector('.ifInputEmpty').innerHTML=innerHTML;
      
    }
  })
}
pageBehaviors();
function onClick(){
  let username = document.querySelector('#usernameInput').value;
  username = username.trim();
  let str = document.querySelector('textarea#content').value;
  let segments=[];
  str = str.replace('"', '\"');
  str=deleteChars(str,',');
  var month = getMonth(str);
  str=deleteHeaderRow(str);
  // console.log(month)
  while(str=cutByItemNum(str)){
    segments.push(getSegment(str));
  }
  // str=cutByItemNum(str);
  var words=[]
  segments.forEach(element => {
    if(element.includes('/')){
      words.push(convertSentenceToWords(element)); 
    }
  });
  sortWords(words);
  console.log("words");
  console.log(words);
  var results=[];
  results=generateResult(words,username,month);
  // console.log(results[0]);
  // results=sortArray(results);
  // console.log(results);
  document.querySelector('tbody').innerHTML=renderTd(results);
}
function deleteChars(str,charToRemove){
  const regex = new RegExp(charToRemove, "g"); 
  return str.replace(regex,"")
}
function getMonth(str){
  var startIndex = str.search('年');
  var endIndex = str.search('月份零用金');
  str = str.substring(startIndex+1,endIndex);
  // return str.trim()
  return str.trim()
  
}
function cutByItemNum(str){
var startIndex = str.search('\n');
if(startIndex==-1)
  return false;
str = str.substring(startIndex);
startIndex = str.search(' ');
return str = str.substring(startIndex);
}
function deleteHeaderRow(str){
  var startIndex = str.search('稅額');
  return str.substring(startIndex);
}
function cutByNum(str){
  let i=1;
  while(str.search(` ${i} `)!=-1){
    if(str.search(` ${i} -`))
      continue;
      var startIndex = str.search(` ${i} `);
    if(str.search(` ${i+1} -`))
      var startIndex = str.search(` ${i} `);
    
  }

}
function getSegment(str){
  var endIndex = str.search('\n');
  var segment = endIndex==-1?str.substring(0):str.substring(0,endIndex);
  return segment;
}
function convertSentenceToWords(str){
  var words=[];
  do{
    var startIndex=str.search(' ');
    str=str.substring(startIndex+1);
    var endIndex=str.search(' ');
    word=str.substring(0,endIndex);
    words.push(word);
  }while(str.search(' ')!=-1)
  words = words.filter((item)=>item!='')
  // console.log(words);
  return words;
}
function sortWords(words){
  // for(let i =0;i<words.length;i++){
  //   words[i].push(i);
  // }
  words.sort((a, b) => {
  if (a[0] < b[0]) {
    return 1;
  }
  if (a[0] > b[0]) {
    return -1;
  }
  return 0;
});
}
function generateResult(array,username,month){
    // let firstProjectName = document.querySelector('#firstProjectName').value;
    // firstProjectName =firstProjectName.trim();
    var results=[];
    for(let i=0;i<array.length;i++){
      var items=[];
      // console.log(array[i].includes('-'))
      if(array[i].includes('-')){
        var money_full=`${array[i][3]}`;
        // console.log(money_full);
        var str_full=`${username}_${month}月份零用金_${array[i][0]}_${array[i][2]}`
        var money_five=`無`;
        var str_five=`${username}_5%_${array[i][0]}_${array[i][2]}`
        // 申請人名稱_X月份零用金_案名_項目說明	
        // 申請人名稱_5%_案名_項目說明

      }else{
        var money_full=`${array[i][4]}`;
        var str_full=`${username}_${month}月份零用金_${array[i][0]}_${array[i][2]}`
        var money_five=`${array[i][5]}`;
        var str_five=`${username}_5%_${array[i][0]}_${array[i][2]}`
      }
      items.push(money_full);
      items.push(str_full);
      items.push(money_five);
      items.push(str_five);
      // results.push(items);
      results[i]=items;
    }
    //console.log(results[0]);
    return results;
}
function sortArray(array){

}
function renderTd(array){
  // console.log(array);
  var innerHTML=''
  for(let i =0;i<array.length;i++){
    innerHTML+=`
        <tr>
          <td>${array[i][0]}</td>
          <td>${array[i][2]}</td>
          <td>${array[i][1]}</td>
          <td>${array[i][3]}</td>
        </tr>
    `
  }
  return innerHTML;
}

// 5387 林信全_3月份零用金_瑞助_加油
// 268 林信全_5%_瑞助_加油
/*

*/