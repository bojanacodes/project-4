from models.link import Link
from models.tag import Tag

list_tags = [
    Tag(name="JavaScript", folder_id=1),
    Tag(name="React", folder_id=1),
    Tag(name="SQL", folder_id=1),
    Tag(name="Front end", folder_id=1),
    Tag(name="Back end", folder_id=1),
    Tag(name="Python", folder_id=1),
    Tag(name="Design", folder_id=1),
    Tag(name="Testing", folder_id=1),
    Tag(name="News", folder_id=1)

]
#! Need to add tags for links in folders 2 and 3

list_links = [
    Link(name="NPM Supertest", description="SuperAgent driven library for testing HTTP servers", url="https://www.npmjs.com/package/supertest", image="TODO: update", importance="medium", tags = [list_tags[0]], folder_id=1),
    Link(name="Chai testing library", description="Chai is a BDD / TDD assertion library for [node](http://nodejs.org) and the browser that can be delightfully paired with any javascript testing framework.", url="https://www.chaijs.com/", image="TODO: update", importance="low", tags = [list_tags[1]], folder_id=1),
    Link(name="Cloudinary", description="TLearn how to upload files with only a few lines of Node.js code, including cloud storage, CDN delivery, and dynamic effects for images and media.", url="https://cloudinary.com/", image="TODO: update", importance="medium", tags = [list_tags[3], list_tags[6]], folder_id=1),
    Link(name="React Guide", description="In this guide, we will examine the building blocks of React apps: elements and components. Once you master them, you can create complex apps from small reusable pieces.", url="https://reactjs.org/docs/hello-world.html", image="TO DO: update", importance="high", tags = [list_tags[0], list_tags[1]], folder_id=1),
    Link(name="Flat Icons", description="The largest database of free icons available in PNG, SVG, EPS, PSD and BASE 64 formats.", url="https://www.flaticon.com/", image="TO DO: update", importance="low", tags = [list_tags[6]], folder_id=1),
    Link(name="Python requests", description="Requests is an elegant and simple HTTP library for Python, built for human beings.", url="https://requests.readthedocs.io/en/master/", image="TO DO: update", importance="medium", folder_id=1),
    Link(name="SQLAlchemy", description="SQLAlchemy 1.3 Documentation on changing attribute behaviour: validators", url="https://docs.sqlalchemy.org/en/13/orm/mapped_attributes.html", image="TO DO: update", importance="medium", tags =[list_tags[4]], folder_id=1),
    Link(name="BBC on AZ vaccine", description="Oxford-AstraZeneca: EU regulator says 'no indication' vaccine linked to blood clots", url="https://www.bbc.co.uk/news/world-europe-56357760", image="TO DO: update", importance="medium", folder_id=2),
    Link(name="BBC on UK Covid Biobank", description="Covid: UK Biobank scans aim to reveal health legacy", url="https://www.bbc.co.uk/news/world-europe-56357760", image="TO DO: update", importance="low", folder_id=2),
    Link(name="Guardian on mass vaccination", description="NHS at its best making a Covid mass vaccination centre", url="https://www.theguardian.com/world/2021/mar/11/the-nhs-as-its-best-making-a-covid-mass-vaccination-centre-a-reality", image="TO DO: update", importance="high", folder_id=2),
    Link(name="Guidelines for responsive web design", description="Guidelines for responsive web design", url="https://www.smashingmagazine.com/2011/01/guidelines-for-responsive-web-design/", image="TO DO: update", importance="high", folder_id=3),
    Link(name="Ex QAnon members", description="QAnon, CultTok, and Leaving It All Behind", url="https://gizmodo.com/qanon-culttok-and-leaving-it-all-behind-1846364321", image="TO DO: update", importance="high", folder_id=3),
    Link(name="End of empire and the rise of tax havens", description="End of empire and the rise of tax havens", url="https://www.newstatesman.com/international/2020/12/end-empire-and-rise-tax-havens", image="TO DO: update", importance="high", folder_id=3)

]