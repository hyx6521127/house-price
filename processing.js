import fs from 'fs'

fs.readFile('./result.json','utf-8', (err,result) => {
    const data = JSON.parse(result)
    const newData = data.filter((item, index) => {
        if(item.address === "龙溪源" || item.address === "凤翔北路129号" || item.address === "天麓湾")
        return false
        else
        return true
    })

    const lowHouse = newData.filter(item => item.unitPrice <= 6000 && item.area >= 100 && item.totalPrice < 60)

    const sortData = lowHouse.sort((a,b) => {
        return Number(a.unitPrice) - Number(b.unitPrice)
    })

    const filter = JSON.stringify(sortData)

    fs.writeFile('./filter.json', filter, (err) => {
        if(err) {
            console.log(err)
            return
        }
        console.log('程序写完')
    })
})
