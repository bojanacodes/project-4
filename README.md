# ![General Assembly logo](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Project #4: A Flask + React App

## Technical Requirements:

* **Build a full-stack application** by making your own backend and your own front-end
* **Use a Python Flask API** using a Flask REST Framework to serve your data from a Postgres database
* **Consume your API with a separate front-end** built with React
* **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
* **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut
* **Have a visually impressive design** 
* **Be deployed online** so it's publicly accessible.

## Overview and Concept

My project partner, Eva, and I decided to build a bookmarking app which would let users organise links. Users can create an account where they can have multiple folders, where they can save a link to. A folder may remain private to a user, or the user can share it with other registered app users. 

We started out by considering other existing apps (Pocket and Drup) and sharing models (Google Drive). We then discussed the additional features we'd like to see. In particular, I wanted to be able to add notes about a link. While I usually save links for the obvious reason, to read the whole article, other times my reasons will vary: sometimes I want to be able to come back to a particular section or image or graph, or since starting the bootcamp, so that I can revisit a style or feature on that link. 

So we decided to try to offer as much flexibility and as many useful features as we could within the project timescales.

We set out to allow users to:
* share amongst each other on a folder-level
* add notes on a link when saving it (or updating it)
* create and add tags to a link
* view a folder's links filtered by a tag
* view a folder's links sorted by date added or by importance 
* comment on a link

The app is deployed here: https://project4urealm.herokuapp.com/


## Technologies used

* Python
* Flask
* SQLAlchemy
* Marshmallow
* Psycopg2-binary
* Flask-bcrypt
* pyJWT
* PostgreSQL
* JavaScript
* React
* React Router Dom 
* Axios
* React-Select
* React-Moment
* React-Slick 
* Bulma

## Tools used

* Ziteboard
* InVision 
* Google spreadsheet
* VS Code
* Git 
* GitHub
* Pipenv
* Insomnia
* TablePlus
* Npm 
* Google Chrome Developer tools
* Coolers
* Hatchful
* Heroku - deployment

## Approach taken

We both wanted to have a detailed plan in place before starting to code. We used a Google spreadsheet to list the features we had in mind, and prioritise them according to what would be required for an MVP version, and what could be bonus features. While discussing on Zoom, I used Ziteboard to draw the relationship diagrams and list the model properties, then Eva used InVision to create our wireframes. We used the spreadsheet to create a to-do list and assign tasks, then update them if in progress or completed. 

![relationship diagrams](https://i.imgur.com/gX91AFk.png)


We decided that the first step for a registered user would be to create a folder, then create a link in that folder. A folder can remain private to that user, or be shared with other users registered on our app. Once shared, all users can add or edit all of the links in that folder, and comment on all of the links. All users with access to that folder can create tags for the links. Tags exist within the scope of a folder.

![Workspace folder view page](https://i.imgur.com/zamfdLB.png)


The initial back-end code was written together to configure the app. The back-end code was written in Python, and the front-end in JavaScript.

We decided to split the controllers and models between us, and added a secure route decorator which to use in controllers in order to ensure that only users with the required permissions could access an end-point. 

An example model:

```
class Tag(db.Model, BaseModel): 

    __tablename__ = 'tags'

    name = db.Column(db.Text, nullable=False, unique=True)
    
    folder_id = db.Column(db.Integer, db.ForeignKey('folders.id', ondelete="CASCADE"))
```


The controllers were a really tricky part of the project for us, but the detailed discussions and plans we'd made before coding were an essential help. I wrote the controllers for the folders and links and some of the comments, while Eva did the same for the users, tags and the rest of the comments.

For example - if a user wants to delete a folder, our code first checks if it is a shared folder. If yes, then the user is no longer associated with the folder, and it doesn't appear in their folders nor can they access it, but the folder remains and is accessible to the other users with permission. If it is a private folder, then it is simply deleted.

```
@router.route("/folders/<int:folder_id>", methods=["DELETE"])
@secure_route

def remove_folder(folder_id):

    folder = Folder.query.get(folder_id)
    user = g.current_user

    try:
        for item in user.folders:
            if item.id == folder.id:
                
                if len(folder.users) > 1:
                    
                    folder.users.remove(user)
                    folder.save()
                    
                else:
                    folder.remove()

                return { 'message': 'Folder deleted successfully' }, 200

    except ValidationError as e:
        return { 'errors': e.messages, 'messages': 'Something went wrong' }, 400

    return {'errors': 'This is not your folder!'}, 401
```

We used Insomnia to check our back-end routes, and TablePlus to check the data and relationships. Viewing the data in TablePlus also helped with making sure that the models and controllers were written correctly. 

When we moved to the front-end, we again split the components between us. We used React Router Dom to create routes for the different "pages" in our single-page app.

We used Axios to work with data from the back-end. 

I mostly focused on the components for the link pages (create, view and edit) and page to create a new tag independently of posting a link. I also made improvements and fixes to the back-end controllers and models where this was required.

# Link components

I wrote three components for the link: createLink, linkForm and updateLink.

LinkForm was a shared component for the other two.

![creating a link page](https://i.imgur.com/rTpBtUL.png)



I created a React form for the link content, used React Creatable Select to handle the tags and used radio buttons for the user to set the link's importance.

The input fields were mapped:

```
 {inputFields.map(field => {
          return <div key={field} className="field">
            <label className="label">
              {field[0].toUpperCase() + field.slice(1)}
            </label>
            <div className="control">
              <input
                className="input"
                type="textarea"
                rows="8"
                value={formData[field]}
                onChange={handleChange}
                name={field}
              />
            </div>
          </div>
        })}
```

React Creatable Select allows users to create new tags whenever they create or update a link. 

All the other tags created within the current folder show up in the Select list options. 

``` 
useEffect(() => {
    async function fetchTags() {
      try {
        const { data } = await axios.get(`/api/folders/${folderId}/tags`, {
          headers: { Authorization: `Bearer ${token}` }
        })

        const tagNames = []

        data.map(item => tagNames.push({ 'label': item.name, 'value': item.name }))

        // console.log('tag names', tagNames)

        updateTagsData(tagNames)

      } catch (err) {
        console.log(err)
      }
    }
    fetchTags()
  }, [])
```

In the createLink and updateLink components, several Axios requests are made to handle getting the data and put or post requests when updating or creating a new link. Both components use a get request in a useEffect upon loading:
* create link page: to get the existing tags within that folder so that they can be displayed in the Select menu
* update link: as above, plus to get all the data about the link to pre-fill the form, Select menu and radio buttons

A handleChange function updates the state variable containing data about the link, and function control submission: 
* handleNewTagsSubmit: a post or put request where a new tag has been created (either when creating or updating a link)
* handleSubmitTags: a post or put request to submit all tags associated with the link (either when creating or updating a link)
* handleSubmitFields: a post or put request to create or update a link

The handleSubmitFields function first checks to see if there are any new tags and calls handleNewTagsSubmit if so, to create the new tags.

Then, or if there were no new tags, I checked if there are any tags associated with the link. If there are, handleSubmitTags is called. 

Finally, all the other information apart from tags is submitted via a post or put request.

```
async function handleSubmitFields(event) {
    event.preventDefault()

    const newFormData = {
      ...formData
      //tags: formData.tags.map(type => type.value)
    }

    const newTags = newFormData.tags.filter(item => item.__isNew__ === true)

    const tags = newFormData.tags

    if (newTags.length > 0) {
      handleNewTagsSubmit(newTags)
    }


    const newFormDataToPost = { 'name': newFormData.name, 'description': newFormData.description, 'url': newFormData.URL, 'importance': newFormData.importance }

    try {
      const { data } = await axios.post(`/api/folders/${folderId}/links`, newFormDataToPost, {
        headers: { Authorization: `Bearer ${token}` }
      })
      // console.log('data', data)
      const linkId = data.id

      if (tags.length > 0) {
        handleSubmitTags(tags, linkId)
      }

      history.push(`/folders/${folderId}/links/${linkId}`)


    } catch (err) {
      console.log(err.response.data)
    }


  }
```

# New tag component

Users also have the option to create a tag(s) independently of creating a link. The button for this feature appears on the folder overview page.

This page contains a form with the React Creatable Select menu. A get request in a useEffect gets all the existing tags in that folder, for the user to be able to check which tags already exist.

A handleNewTagsSubmit function submits the new tags and takes the user back to that folder. There was an issue here where because the post request for the new tags would take too long, when the folder overview page loaded, the tags would not be displayed on the left side bar, which could be confusing. So I added a timeout to delay going back to the folder page.

```
setTimeout(() => {
      console.log('in your timeout')
      history.push(`/folders/${folderId}`)
    }, 3000)

    console.log('after timeout')

    history.push(`/folders/${folderId}/tags/`)
```

![creating a tag page](https://i.imgur.com/eifBz7G.png)
 

# Filtering on the folder overview page

I also added some code on the folder overview component to allow a user to filter the links displayed on the page by tag, and some code to allow a user to re-order the links displayed by importance (or by date added, which is the default).

![Filtering links](https://i.imgur.com/FOA4GxB.png)



This is an example of the filtering by tag - the original data (saved in a permanentData state variable) would be filtered to check it contained the tag the user was looking for, and if so, that link was pushed to an array. This array would then be used to update another state variable, links. 

```
 function filteringData(event) {

    const tagName = event

    if (tagName === 'All') {
      updateLinks(permanentData)
    } else {
      const filteredLinks = []

      permanentData.forEach(link => {
        link.tags.forEach(tag => {
          if (tag.name === tagName) {
            filteredLinks.push(link)
          }
        })
      })

      updateLinks(filteredLinks)

    }
  }
```

## Challenges and learnings

The biggest challenge was working with data from the join tables.

Another bug was with the comment model - comments display without the username. 

An example of a more prosaic bug was forgetting to add error codes in some of the controllers. We'd obviously copied and pasted that line in many other controller functions, which led to confusion during testing much later on. This experience reiterated a useful life lesson: copy and paste responsibly. 

For me, the most satisfying wins were the back-end controller and model wins. I went into the project expecting working with Flask and SQLAlchemy to be a challenge, but with a lot of patience and some trial-and-error, understanding this set-up was immensely rewarding.

## Future features

We had lots of ideas but had to prioritise features in order to have a functioning app by the project's deadline. Other features we'd love to include:
* **Validation.** We ran out of time to add validation on the front and back-end. For example, highlighting the essential fields on the link form on the front-end and adding validation rules for the user password/email address on the back-end.
* **Allowing a user to update and delete a tag.**
* **Allowing a public option for a folder.** A user could set a folder of theirs to be viewed by anyone online with a link to it. 
* **Image scraping.** When a user saves a link an image is automatically saved from the link, and displayed when they view the link and in the folder overview. 
* **Creating a folder admin user.** By default this would be the user who created the folder. This user could reassign the admin rights to another user with access to the folder. This user would have more permissions than the others who have access to the folder, for example being able to delete all links or comments, while the other users could only delete their own links and comments.
* **Displaying the username of the user who posted a link and filtering by a username.** This could be especially useful in an educational context - the instructor and all students could post links, but a student may sometimes want to view only the links supplied by the instructor.
* **Search** This would allow a user to search for terms found either in the link name or in the description as well. 