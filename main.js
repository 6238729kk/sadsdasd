
const WeekendColor = (param) => {
  if(param == '토'){
      $(`div[name=${param}]`).css({"color" : "blue"});
  }
  if(param == '일'){
      $(`div[name=${param}]`).css({"color" : "red"});
  }
}

const newFun = (date) => {

const YEARS = 7   // 몇년 list, 현재 년이 중앙에
const yearArrays = Array(YEARS).fill().map((dumy,idx) =>
        (idx+new Date().getFullYear() - parseInt(YEARS/2)));
const monthArrays = Array(12).fill().map((dumy,idx) =>(idx+1));

const dateArrays = Array(new Date(date.getFullYear(),date.getMonth()+1,0).getDate()+4)
      .fill().map((dumy,idx) =>idx-1) ;

const dateLists = dateArrays.map( day => {
  new Date(date.getFullYear(),date.getMonth(),day);

})

return [yearArrays,monthArrays,dateLists]
}

const drawCal2 = (strDate) => {

  // let strDate = new Date("2022-01-15");

  let allArrays = newFun(strDate);
  let yearArrays = allArrays[0];
  let monthArrays = allArrays[1];
  let dateLists = allArrays[2];
  // let dates = dateLists.map(date=>date.getDate())
  console.log(allArrays[2])


  // draw Year Select box

  console.log(yearArrays)

  yearArrays.map(year=> $('.yearList').append($(`<li class="yearItem" value="${year}">${year}년</li>`)))
  // default is Today
  $('.yearLabel').append($(`<div >${yearArrays[yearArrays.indexOf(strDate.getFullYear())]}년</div>`));

  // draw Month Select box
  monthArrays.map(month => $('.monthList').append($(`<li class="monthItem" value="${month}">${month}월</li>`)))
  // default is Today
  $('.monthLabel').append($(`<div >${monthArrays[monthArrays.indexOf(strDate.getMonth()+1)]}월</div>`));

  //draw Day Select box
  let week = ['일', '월', '화', '수', '목', '금', '토'];
  // let dates = dateLists.map(date=>
  //   [`${(date.getMonth()+1).toString().padStart('2',0)}${date.getDate().toString()}`, week[date.getDay()]]
  //   )
  let dates = dateLists.map(date=>
    [date.getDate().toString(), week[date.getDay()], date.getMonth().toString()]
    )

  dates.map(day => {
  $('.selectDay').append(
    $(`<ul>
        <li class="unselected" name=${day[2]+day[0]}>${day[0]}</li>
        <div name=${day[1]}>${day[1]}</div>
      </ul>`)
      )
  }
  )
  // default is Today
  let temp = strDate.getMonth().toString() + strDate.getDate().toString();
  console.log(temp)
   $(`li[name=${temp}]`).attr('class', 'selected');
}

const makeEvent =() => {
  // year Selectbox Event
  const yearLabel = document.querySelector('.yearLabel');
  const yItems = document.querySelectorAll('.yearItem');

  const handleSelect_year = (item) => {
    yearLabel.parentNode.classList.remove('active');
    yearLabel.innerHTML = item.textContent;
 }

  yItems.forEach(yitem => {
    yitem.addEventListener('click', () => handleSelect_year(yitem))
  })

  yearLabel.addEventListener('click', () => {
    if(yearLabel.parentNode.classList.contains('active')) {
      yearLabel.parentNode.classList.remove('active');
    } else {
      yearLabel.parentNode.classList.add('active');
    }
  })


  //month Selectbox Event

  const monthLabel = document.querySelector('.monthLabel');
  const mItems = document.querySelectorAll('.monthItem');

  const handleSelect_month = (item) => {
    monthLabel.parentNode.classList.remove('active');
    monthLabel.innerHTML = item.textContent;
    if (item.value == 13){
      item.value =1
    }
    // let $testYMD = $(`<p class="selectedM">${item.value}</p>`);
    // $('.test .selectedMonthVal').html($testYMD);

    // drawSelectedCal(`${$('.test .selectedYearVal p').text()}-${item.value}-01`);
  }

  mItems.forEach(mItem => {
    mItem.addEventListener('click', () => handleSelect_month(mItem))
  })

  monthLabel.addEventListener('click', () => {
    if(monthLabel.parentNode.classList.contains('active')) {
      monthLabel.parentNode.classList.remove('active');
    } else {
      monthLabel.parentNode.classList.add('active');
    }
  })

  // day Selectbox event
  $('.selectDay li').on('click', function(){
    $('.selectDay li').attr('class', 'unselected');
    $(this).attr('class', 'selected');

    // let $testYMD = $(`<p>${$(this).attr('name')}</p>`);
    // $('.test .selectedDayVal').html($testYMD);
  })

}
$( document ).ready(function() {
  drawCal2(new Date());
  makeEvent();
});



    // let dates = dateLists.map(date=>
    //   [date.getDate(), week[date.getDay()], date.toLocaleDateString().replace(/(\s*)/g, "").replace]
    //   )
  // console.log("dateList",dateLists)