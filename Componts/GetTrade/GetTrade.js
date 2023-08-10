function GetTrades(){
const projectTime = new Date()
const Year = projectTime.getFullYear()
const Month = projectTime.getMonth()+1
const Day = projectTime.getDate()
const hour = projectTime.getHours()
var CurrentDate = String(Year)
	if(Month>=10)
	{
		CurrentDate+=Month
	}
	else{
		CurrentDate+='0'+Month
	}
	if(Day>=10)
	{
		CurrentDate+=Day
	}
	else{
		CurrentDate+='0'+Day
	}
	// 0 表示上午 1 表示下午
	if(hour>=12)
	{
		CurrentDate+=0
	}
	else{
		CurrentDate+=1
	}
	return CurrentDate
}
module.exports={
	GetTrades
}