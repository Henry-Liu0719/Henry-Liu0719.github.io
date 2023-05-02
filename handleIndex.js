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
  if(document.querySelector('#firstProjectName').value==''){
    innerHTML+='<label for="firstProjectName">未輸入第一個案名(點擊前往)</label><br>'
    isEmpty=true;
  }
  if(document.querySelector('#content').value==''){
    innerHTML+='<label for="content">未輸入記事本文字(點擊前往)</label><br>'
    isEmpty=true;
  }
  if(isEmpty){
    document.querySelector('.ifInputEmpty').classList.remove('d-none');
    document.querySelector('.ifInputEmpty').innerHTML=innerHTML;
    
  }
})
function onClick(){
  let username = document.querySelector('#usernameInput').value;
  username = username.trim();
  let str = document.querySelector('textarea').value;
  let segments=[];
  str = str.replace('"', '\"');
  // str = str.replace(/\u3000/g, '@');
  // str = str.replace('	', '**');
  // str = str.replace('	', '@@');
  // str = str.replace(' ', '**');
  // str=deleteChars(str,'　');
  // var fullSpace = str[10];
  // str = str.replace(fullSpace, '@@');
//   var charCode = str.charCodeAt(10); // 獲取字符的 Unicode 編碼
//   var asciiCode = charCode.toString(10); // 轉換成十進制的 ASCII 編碼
  
//   for (var i = 0; i <20; i++) {
//   var charCode = str.charCodeAt(i); // 獲取字符的 Unicode 編碼
//   var asciiCode = charCode.toString(10); // 轉換成十進制的 ASCII 編碼
//   if(asciiCode=='10'){
//     str[i]='@'
//   }
//   console.log(str[i] + " 的 ASCII 編碼是：" + asciiCode);
// }

  // str = deleteHeaderRow(str);
  // str = encodeURIComponent(str);
  str=deleteChars(str,',');
  var month = getMonth(str);
  // console.log(month)
  while(str=cutByDate(str)){
    segments.push(getSegment(str));
  }
  // str=cutByDate(str);
  var words=[]
  segments.forEach(element => {
    words.push(convertSentenceToWords(element)); 
  });
  console.log(words);
  var results=[];
  results=generateResult(words,username,month);
  // console.log(results[0]);
  document.querySelector('tbody').innerHTML=renderTd(results);
}
// function onClick(){
//   let username = document.querySelector('#usernameInput').value;
//   let firstProjectName = document.querySelector('#firstProjectName').value;
//   let str = document.querySelector('textarea').value;
//   let segments=[];
//   str=deleteChars(str,',');
//   var month = getMonth(str);
//   cutByNum(str);
// }
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
function cutByDate(str){
var startIndex = str.search('/');
if(startIndex==-1)
  return false;
str = str.substring(startIndex);
startIndex = str.search(' ');
// //console.log(`剩餘的句子:${str}`); // 輸出：加油 1,931 1,839 92 18,069
return str = str.substring(startIndex);
}
function deleteHeaderRow(str){
  var startIndex = str.search('稅額');
  return str.substring(startIndex);
}
function cutByNum(str){
  // //console.log(`cutByNum:${str}`);
  let i=1;
  while(str.search(` ${i} `)!=-1){
    if(str.search(` ${i} -`))
      continue;
      var startIndex = str.search(` ${i} `);
    if(str.search(` ${i+1} -`))
      var startIndex = str.search(` ${i} `);
      //卡關，startIndex= 1 ，!= 1 -
      //endIndex= 2 ,!= 2 -
    
  }
  // if(startIndex==-1)
  //   return false;
  // str = str.substring(startIndex);
  // startIndex = str.search(' ');
  // //console.log(`剩餘的句子:${str}`); // 輸出：加油 1,931 1,839 92 18,069
  // return str = str.substring(startIndex);

}
function getSegment(str){
  var endIndex = str.search('/');
  var segment = endIndex==-1?str.substring(0):str.substring(0,endIndex);
  // //console.log(`截到的句子:${segment}`); // 輸出：加油 1,931 1,839 92 18,069
  return segment;
}
function convertSentenceToWords(str){
  var words=[];
  for(let i=0;i<10;i++){
  }
  do{
    var startIndex=str.search(' ');
    str=str.substring(startIndex+1);
    // //console.log(str);
    var endIndex=str.search(' ');
    word=str.substring(0,endIndex);
    words.push(word);
  }while(str.search(' ')!=-1)
  words = words.filter((item)=>item!='')
  return words;
}
function generateResult(array,username,month){
    let firstProjectName = document.querySelector('#firstProjectName').value;
    firstProjectName =firstProjectName.trim();
    var items=[];
    var results=[];
    for(let i=0;i<array.length;i++){
      console.log(array[i].includes('-'))
      if(i==0){
        if(array[i].includes('-')){

          var money_full=`${array[i][1]}`;
          var str_full=`${username}_${month}月份零用金_${firstProjectName}_${array[i][0]}`
          var money_five=``;
          var str_five=`${username}_5%_${firstProjectName}_${array[i][0]}`
        }else{
          var money_full=`${array[i][2]}`;
          var str_full=`${username}_${month}月份零用金_${firstProjectName}_${array[i][0]}`
          var money_five=`${array[i][3]}`;
          var str_five=`${username}_5%_${firstProjectName}_${array[i][0]}`
        }
      }else if(array[i].includes('-')){
        var money_full=`${array[i][1]}`;
        // console.log(money_full);
        var str_full=`${username}_${month}月份零用金_${array[i-1][6]}_${array[i][0]}`
        var money_five=`無`;
        var str_five=`${username}_5%_${array[i-1][6]}_${array[i][0]}`
      }else{
        var money_full=`${array[i][2]}`;
        var str_full=`${username}_${month}月份零用金_${array[i-1][6]}_${array[i][0]}`
        var money_five=`${array[i][3]}`;
        var str_five=`${username}_5%_${array[i-1][6]}_${array[i][0]}`
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
function renderTd(array){
  var innerHTML=''
  for(let i =0;i<array[0].length;i+=4){
    innerHTML+=`
        <tr>
          <td>${array[0][i]}</td>
          <td>${array[0][i+2]}</td>
          <td>${array[0][i+1]}</td>
          <td>${array[0][i+3]}</td>
        </tr>
    `
  }
  return innerHTML;
}

// 5387 林信全_3月份零用金_瑞助_加油
// 268 林信全_5%_瑞助_加油
/*

*/