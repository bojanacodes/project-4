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
    Link(name="NPM Supertest", description="SuperAgent driven library for testing HTTP servers", url="https://www.npmjs.com/package/supertest", image="TODO: update", importance="Medium", tags = [list_tags[0]], folder_id=1),
    Link(name="Chai testing library", description="Chai is a BDD / TDD assertion library for [node](http://nodejs.org) and the browser that can be delightfully paired with any javascript testing framework.", url="https://www.chaijs.com/", image="TODO: update", importance="Low", tags = [list_tags[1]], folder_id=1),
    Link(name="Cloudinary", description="TLearn how to upload files with only a few lines of Node.js code, including cloud storage, CDN delivery, and dynamic effects for images and media.", url="https://cloudinary.com/", image="TODO: update", importance="Medium", tags = [list_tags[3], list_tags[6]], folder_id=1),
    Link(name="React Guide", description="In this guide, we will examine the building blocks of React apps: elements and components. Once you master them, you can create complex apps from small reusable pieces.", url="https://reactjs.org/docs/hello-world.html", image="TO DO: update", importance="High", tags = [list_tags[0], list_tags[1]], folder_id=1),
    Link(name="Flat Icons", description="The largest database of free icons available in PNG, SVG, EPS, PSD and BASE 64 formats.", url="https://www.flaticon.com/", image="TO DO: update", importance="Low", tags = [list_tags[6]], folder_id=1),
    Link(name="Python requests", description="Requests is an elegant and simple HTTP library for Python, built for human beings.", url="https://requests.readthedocs.io/en/master/", image="TO DO: update", importance="Medium", folder_id=1),
    Link(name="SQLAlchemy", description="SQLAlchemy 1.3 Documentation on changing attribute behaviour: validators", url="https://docs.sqlalchemy.org/en/13/orm/mapped_attributes.html", image="TO DO: update", importance="Medium", tags =[list_tags[4]], folder_id=1),
    Link(name="React Paginate", description="A ReactJS component to render a pagination.", url="https://www.npmjs.com/package/react-paginate", image="TO DO: update", importance="Low", tags =[list_tags[0], list_tags[1]], folder_id=1),
    Link(name="React Select", description="A flexible and beautiful Select Input control for ReactJS with multiselect, autocomplete, async and creatable support.", url="https://react-select.com/home", image="TO DO: update", importance="High", tags =[list_tags[0], list_tags[1], list_tags[3], list_tags[6]], folder_id=1),
    Link(name="How is Python different", description="How is Python Different from Other Programming Languages?", url="https://hackernoon.com/how-is-python-different-from-other-programming-languages-63311390f8dd", image="TO DO: update", importance="High", tags =[list_tags[4], list_tags[5]], folder_id=1),
    Link(name="Python comprehension", description="ACheap Introduction to Comprehension In Python", url="https://medium.com/the-andela-way/a-cheap-introduction-to-comprehension-in-python-2269895f996f", image="TO DO: update", importance="Medium", tags =[list_tags[4], list_tags[5]], folder_id=1),
    Link(name="PostgreSQL cheat sheet", description="PostgreSQL cheat sheet", url="https://www.postgresqltutorial.com/wp-content/uploads/2018/03/PostgreSQL-Cheat-Sheet.pdf", image="TO DO: update", importance="High", tags =[list_tags[2], list_tags[4]], folder_id=1),
    Link(name="Python Modules and Packages", description="This article explores Python modules and Python packages, two mechanisms that facilitate modular programming.", url="https://realpython.com/python-modules-packages/", image="TO DO: update", importance="Medium", tags =[list_tags[4], list_tags[5]], folder_id=1),
    Link(name="CSS Zen Garden", description="A demonstration of what can be accomplished through CSS-based design.", url="http://www.csszengarden.com/", image="TO DO: update", importance="Medium", tags =[list_tags[3], list_tags[6]], folder_id=1),
    Link(name="Centering in CSS", description="Get ready to learn how to approach the age old question faced by many a CSS practitioner: How do I center a div?", url="https://moderncss.dev/complete-guide-to-centering-in-css/", image="TO DO: update", importance="High", tags =[list_tags[3], list_tags[6]], folder_id=1),
    Link(name="Mobile testing", description="With mobile traffic accounting for over 50% of web traffic these days, leaving your mobile performance unoptimized isn’t really an option. In this article, we’ll discuss the complexity and challenges of mobile, and how mobile testing tools can help us with just that.", url="https://www.smashingmagazine.com/2021/03/mobile-app-web-testing/", image="TO DO: update", importance="High", tags =[list_tags[7]], folder_id=1),
    Link(name="BBC on AZ vaccine", description="Oxford-AstraZeneca: EU regulator says 'no indication' vaccine linked to blood clots", url="https://www.bbc.co.uk/news/world-europe-56357760", image="TO DO: update", importance="Medium", folder_id=2),
    Link(name="BBC on UK Covid Biobank", description="Covid: UK Biobank scans aim to reveal health legacy", url="https://www.bbc.co.uk/news/world-europe-56357760", image="TO DO: update", importance="Low", folder_id=2),
    Link(name="Guardian on mass vaccination", description="NHS at its best making a Covid mass vaccination centre", url="https://www.theguardian.com/world/2021/mar/11/the-nhs-as-its-best-making-a-covid-mass-vaccination-centre-a-reality", image="TO DO: update", importance="High", folder_id=2),
    Link(name="Guidelines for responsive web design", description="Guidelines for responsive web design", url="https://www.smashingmagazine.com/2011/01/guidelines-for-responsive-web-design/", image="TO DO: update", importance="High", folder_id=3),
    Link(name="Ex QAnon members", description="QAnon, CultTok, and Leaving It All Behind", url="https://gizmodo.com/qanon-culttok-and-leaving-it-all-behind-1846364321", image="TO DO: update", importance="High", folder_id=3),
    Link(name="End of empire and the rise of tax havens", description="End of empire and the rise of tax havens", url="https://www.newstatesman.com/international/2020/12/end-empire-and-rise-tax-havens", image="TO DO: update", importance="High", folder_id=3)

]