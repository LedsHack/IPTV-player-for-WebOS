document.addEventListener("DOMContentLoaded", () => {
  let channelSel = document.querySelector("#channel");
  let video = document.querySelector("#video");
  let currentChannel = 1;		//Канал которий воизпроизводится на данний момент
  let channelsUrlArr = [];		//Масив с силками каналов
  let channeldNameArr = [];		//Масив с названием каналов
  let number = "";				//Переменная для ввода каналов
  let timerId = null;           //Айди таймера
  let channelCount;             //К-л каналов

  const url = "http://147.78.66.34/tv/api.php?list=1"; //Линк для апи запроса списка каналов в формате JSON("ChanelName": "ChanelLink")

  fetch(url)
    .then((responce) => responce.json())
    .then((result) => {
      channelsObj = Object.entries(result);

      channelsObj.forEach((item) => {
        channeldNameArr.push(item[0]);
        channelsUrlArr.push(item[1]);
      });

      channelCount = channelsObj.length;

      showChanel(currentChannel);
      channelHandler();
    });
	
	
	//ясно
	function playChannel(channel){
		video.src = channelsUrlArr[channel];
		video.addEventListener("canplay", video.play());
    }
	
	
	//Табло с каналом
    function showChanel(currentChannel){
		playChannel(currentChannel - 1);
		channelSel.innerHTML = "<h1>CH     " + currentChannel + "</h1>";
		setTimeout(function(){
			channelSel.innerHTML = "";
		}, 1300);
    }
	
	
	//Ввод канала с пульта
	function enterChanel(numers) {
		number += numers;
		if (Number.parseInt(number) <= channelCount && number != "0") {
			if (timerId != null){
				clearTimeout(timerId);															
				timerId = null;																	
			}
		    //showChanel(number);																
		    //	Тосик дароваа													
	        channelSel.innerHTML = "<h1>CH     " + number + "</h1>";
            timerId = setTimeout(function(){												
				chanel = Number.parseInt(number);	
				//currentChannel = number;
				currentChannel = chanel;
				showChanel(currentChannel);														
				channelSel.innerHTML = "";														
				number = "";																	
            }, 2000);
			
		}else{
			channelSel.innerHTML = "";                                                           
			number = "";	
        }
    }
	
	function channelHandler(){
		document.addEventListener("keydown", function (inEvent){
			switch (inEvent.keyCode){
				case 33:
				    //next
				    if(currentChannel + 1 <= channelCount){
						currentChannel++;
					}else currentChannel = 1;
					showChanel(currentChannel);
				break;
				case 34:
					//back
					if(currentChannel - 1 >= 1){
						currentChannel--;
					}else currentChannel = channelCount;
					showChanel(currentChannel);
				break;
				case 49:
				    //1
				    enterChanel(1);
				break;
				case 50:
				  //2
				  enterChanel(2);
				break;
				case 51:
				  //3
				  enterChanel(3);
				break;
				case 52:
				  //4
				  enterChanel(4);
				break;
				case 53:
				  //5
				  enterChanel(5);
				break;
				case 54:
				  //6
				  enterChanel(6);
				break;
				case 55:
				  //7
				  enterChanel(7);
				break;
				case 56:
				  //8
				  enterChanel(8);
				break;
				case 57:
				  //9
				  enterChanel(9);
				break;
				case 48:
				  //0
				  enterChanel(0);
				break;
			}
		});
	}
});
