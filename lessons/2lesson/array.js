let coloros = ['green' , 'blue' , 'red']

console.log(coloros);

// במערך הערכים נשמרים כל אחד בתא זיכרון נפרד, תאי הזכרון מתחילים באינדס 0.

coloros[2]

// שאני מבקש ממנו colors[2] אני אומר לו לך לצבע האדום

// array = object, its saves the array as key = value

coloros[1] = 'black'

const colors1 = coloros

colors1[3] = 'my name is nadiv'

console.log(coloros);

// שנדפיס colors זה ידפיס ביחד עם colors1 בגלל שמערך הוא אובייקט ושני האובייקטים נשמרים באותו מקום של זכרון .

colors1[5] = 'poker face'

console.log(coloros);