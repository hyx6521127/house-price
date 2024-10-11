import fs from 'fs'

fs.readFile('./daxing.json', 'utf-8', (err, result) => {
    const data = JSON.parse(result)
    const newData = data.filter((item, index) => {
        if (
            item.address === "龙溪源" || 
            item.address === "观锦中央学府B区" || 
            item.address === "顺富康城" || 
            item.address === "花间集" ||
            item.address === "金樾澜岸二期 " || 
            item.address === "观锦中央学府A区" || 
            item.address === "川航雅郡" ||
            item.address === "沙湾小区"
        )
            return false
        else
            return true
    })

    const lowHouse = newData.filter(item => item.floor < 20 && item.area >= 100)

    const sortData = lowHouse.sort((a, b) => {
        return Number(a.unitPrice) - Number(b.unitPrice)
    })

    const filter = JSON.stringify(sortData)

    fs.writeFile('./filter.json', filter, (err) => {
        if (err) {
            console.log(err)
            return
        }
        console.log('程序写完')
    })
})
