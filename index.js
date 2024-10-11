import * as cheerio from 'cheerio'
import request from 'request-promise'
import fs from 'fs'

const baseUrl = "https://yaan.ke.com/ershoufang/daxing2/"

const result = []

for(let i = 1; i < 32; i++) {
    console.log("正在读取第" + i + "页数据")
    let url = baseUrl
    if (i > 1) {
        url = baseUrl + 'pg' + i
    } 

    const html = await request({
        url,
        headers: {
            Cookie:
                "BMAP_SECKEY=YdAry-lXS4gItvKyfqH-u0JeTLdwzdgVLLxXBsb8tkPpGaTqCQUZin2UZuPxnOIN1xnVm8BvYvK3ohxF0RC9LIAj2w6G_ZSFgZhDokeakJJXxLuJZq876m-wEo4M6wpAUTGTekZsDdOvomdFFr4XPdRs-Uv2V08TQeoLEVxvLmP0r3TLKD6yQTNKGWFKERiR; SECKEY_ABVK=ViE6g4tYFBm+kQmW/nIUESvJCtfnSwlBsDqjJf5GPy0%3D; lianjia_uuid=96afcfb2-a4d6-4093-8be4-6482ff4948f6; crosSdkDT2019DeviceId=-y2ao4f-1hrfwo-jmkkehucup8wmon-j56ndub7a; _ga=GA1.2.598982259.1716171504; ke_uuid=da73fda15a2f015ab4c404169344d788; Hm_lvt_9152f8221cb6243a53c83b956842be8a=1720658531,1721197682,1722905523; __xsptplus788=788.3.1722905894.1722905981.3%234%7C%7C%7C%7C%7C%23%23%23; HMACCOUNT=C161E5CA1BE90DB5; digv_extends=%7B%22utmTrackId%22%3A%22%22%7D; _gid=GA1.2.639913905.1728610891; Hm_lvt_b160d5571570fd63c347b9d4ab5ca610=1726110103,1726713693,1728607074; lianjia_ssid=1fa8ce56-4e7a-435f-9a16-fe58941662b4; hip=hiLUs9j8JV-xu2L6B8EYAQ7n7UJpCbmunVf0qI-HYn4tPUx_pg_aW2LdHQgUggLEV58IH5nwQksNdknnAB-sqDTcL16iSPBadEntunaDxhDeDoNBp58Yksl4oZgjdO3zQvDuNBy6Q_GspN9Ckg9_UmiGSgzGAcUTIckwBBxRcwpBj1WHCabiXg%3D%3D; select_city=511800; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2218ec608cab318a9-01b750d1d98623-26001a51-1296000-18ec608cab4175a%22%2C%22%24device_id%22%3A%2218ec608cab318a9-01b750d1d98623-26001a51-1296000-18ec608cab4175a%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_utm_source%22%3A%22baidu%22%2C%22%24latest_utm_medium%22%3A%22pinzhuan%22%2C%22%24latest_utm_campaign%22%3A%22wybeijing%22%2C%22%24latest_utm_content%22%3A%22biaotimiaoshu%22%2C%22%24latest_utm_term%22%3A%22biaoti%22%7D%7D; Hm_lpvt_b160d5571570fd63c347b9d4ab5ca610=1728632175; srcid=eyJ0Ijoie1wiZGF0YVwiOlwiYTFkZDIzOTg2ZDZlNTEyM2FhODMyMjUzNDMwOTUxODkwZjE4NWU5ODEwMDY4ZTkyNzg1YzE1NGVhNzg1N2JkMWI5NTc1Mjk0OGVkZDdjMjAwMzY0N2JhZmYyZDBlYjA1OTdhODk0MGFlZDliNmYwNzhjMDJiNTM4YmM3MTA2MzQwODQ0MzhlMDFjMTY2ODI5ZGZhZjk3NjY1NmRkNGQ1YWIzZWRkOGUzNDc1NDIxOThhMDUwNGE5Mzk1NTgwMmVhMWI2MGYxZmNiNWVmYzJkN2YzM2M3YmE3MzY5MjQyYzkwZDViY2YwNDkxMTY4MzdmZTdjY2RlYWQ2ZDE3N2RiMlwiLFwia2V5X2lkXCI6XCIxXCIsXCJzaWduXCI6XCJjNWE4NzNiY1wifSIsInIiOiJodHRwczovL3lhYW4ua2UuY29tL2Vyc2hvdWZhbmcvZGF4aW5nMi8iLCJvcyI6IndlYiIsInYiOiIwLjEifQ==",
            Accept:
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            // "Accept-encoding": "gzip, deflate, br, zstd",
            "Accept-language": "zh-CN,zh;q=0.9",
            "Cache-control": "no-cache",
            Connection: "keep-alive",
            Dnt: 1,
            // Host: "yaan.ke.com",
            // "Sec-ch-ua":'"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
            "Sec-ch-ua-mobile": "?0",
            "Sec-ch-ua-platform": '"Windows"',
            "Sec-fetch-dest": "document",
            "Sec-fetch-mode": "navigate",
            "Sec-fetch-site": "same-origin",
            "Sec-fetch-user": "?1",
            "Upgrade-insecure-requests": 1,
            "User-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
        }
    })

    const $ = cheerio.load(html)

    const houseList = $('li.clear')

    console.log(houseList.length)

    for(let i = 0; i < houseList.length; i++) {
        const item = $(houseList[i])
        const address = item.find('.flood a').text()
        const floorMatch = item.find('.houseInfo').text().replace(/([ \n]*)/g, '').match(/共(\d+)层/)
        const floor = floorMatch ? floorMatch[1] : 999
        const areaMatch = item.find(".houseInfo").text().replace(/([ \n]*)/g, '').match(/(([0-9]+|0)\.([0-9]{1,2})|[0-9]+)平米/)
        const area = areaMatch ? areaMatch[1] : 0
        const totalPrice = item.find('.totalPrice.totalPrice2 span').text()
        const unitPrice = item.find('.unitPrice span').text().replace('元/平', "").replace(',', "")
        const link = item.find('.VIEWDATA.CLICKDATA.maidian-detail').prop("href")
        const houseInfo = {
            address,
            floor,
            totalPrice,
            unitPrice,
            link,
            area
        }
        result.push(houseInfo)
    }
}

const jsonResult = JSON.stringify(result)

fs.writeFile('./result.json', jsonResult, (err) => {
    if(err) {
        console.log(err)
        return
    }
    console.log("数据写完")
})
