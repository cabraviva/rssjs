const rssjs = class RssFeed {
  constructor (xml, parse = function () {}) {
    this.raw = xml
    this.parser = parse || function () {}
    this.removeXMLAny()
    this.parseXML()
  }

  getMeta () {
    this.meta = {}
    this.meta.title = this.rss.querySelector('title').innerText || ''
    this.meta.generator = this.rss.querySelector('generator').innerText || ''
    this.meta.language = this.rss.querySelector('language').innerText || ''
    this.meta.description = this.rss.querySelector('description').innerText || ''
    this.meta.lastbuilddate = this.rss.querySelector('lastbuilddate').innerText || ''
    this.meta.copyright = this.rss.querySelector('copyright').innerText || ''
  }

  getArticles () {
    this.articles = this.rss.querySelectorAll('item')
    this.articles.forEach((item) => {
      this.item = {
        title: item.querySelector('title').innerText
      }
      this.parser(this.meta, this.item)
    })
  }

  removeXMLAny () {
    this.raw = this.raw.replace(/\n/g, '')
    this.raw = this.raw.replace(/\t/g, '')
    this.raw = this.raw.replace(/<\?(.*?)\?>/g, '')
  }

  parseXML () {
    this.xml = document.createElement('div')
    this.xml.innerHTML = this.raw
    this.rss = this.xml.getElementsByTagName('rss')[0].getElementsByTagName('channel')[0]
    this.getMeta()
    this.getArticles()
  }
}
window.rssjs = rssjs
