import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './index.css'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class PasswordManager extends Component {
  state = {
    isTrue: false,
    latestList: [],
    website: '',
    username: '',
    password: '',
    isShow: false,
  }

  listenWebsite = e => {
    this.setState({website: e.target.value})
  }

  listenUsername = e => {
    this.setState({username: e.target.value})
  }

  listenPassword = e => {
    this.setState({password: e.target.value})
  }

  addContent = e => {
    e.preventDefault()
    const {username, website, password} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const classValue = colorList[Math.floor(Math.random() * 5)]
    const newValues = {
      id: uuidv4(),
      initialValue: initial,
      websiteName: website,
      userName: username,
      Password: password,
      classAdd: classValue,
    }
    this.setState(prevState => ({
      latestList: [...prevState.latestList, newValues],
      website: '',
      username: '',
      password: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  showPassword = e => {
    if (e.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  searchList = e => {
    this.setState({searchInput: e.target.value})
  }

  deleteItem = id => {
    const {latestList} = this.state
    const newList = latestList.filter(eachValue => eachValue.id !== id)
    const caseOf = newList.length !== 0
    this.setState({latestList: newList, isTrue: caseOf})
  }

  render() {
    const {website, username, password, latestList, isShow, searchInput} =
      this.state
    let {isTrue} = this.state
    const newList = latestList.filter(eachValue =>
      eachValue.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }
    return (
      <div className="main-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          className="app-logo"
          alt="app logo"
        />
        <div className="sub-div1">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            className="sub-div1-image2"
            alt="password manager"
          />
          <form className="add-details" onSubmit={this.addContent}>
            <h1 className="detail-heading">Add New Password</h1>
            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                className="input-image"
                alt="website"
              />
              <input
                type="text"
                className="input-element"
                placeholder="Enter Website"
                onChange={this.listenWebsite}
                value={website}
              />
            </div>

            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                className="input-image"
                alt="username"
              />
              <input
                type="text"
                className="input-element"
                placeholder="Enter Username"
                onChange={this.listenUsername}
                value={username}
              />
            </div>
            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                className="input-image"
                alt="password"
              />
              <input
                type="password"
                className="input-element"
                placeholder="Enter Password"
                onChange={this.listenPassword}
                value={password}
              />
            </div>
            <button type="submit" className="add-btn">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            className="sub-div1-image1"
            alt="password manager"
          />
        </div>
        <div className="sub-div2">
          <div className="first-div">
            <div className="your-password">
              <h1 className="heading-name">Your Passwords</h1>
              <p className="colored-text">{newList.length}</p>
            </div>
            <div className="search-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                className="input-image"
                alt="search"
              />
              <input
                type="search"
                className="input-element"
                placeholder="Search"
                onChange={this.searchList}
                value={searchInput}
              />
            </div>
          </div>
          <hr />
          <div className="show-passwords">
            <input
              type="checkbox"
              className="check-box"
              id="check"
              onChange={this.showPassword}
            />
            <label htmlFor="check" className="label-password">
              Show Passwords
            </label>
          </div>
          {!isTrue && (
            <div className="empty-state">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                className="empty-image"
                alt="no passwords"
              />
              <p className="no-passwords">No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className="result-container">
              {newList.map(eachValue => (
                <li className="item-list" id={eachValue.id} key={eachValue.id}>
                  <p className={`initial ${eachValue.classAdd}`}>
                    {eachValue.initialValue}
                  </p>
                  <div className="list-content">
                    <p className="website">{eachValue.websiteName}</p>
                    <p className="website">{eachValue.userName}</p>
                    {!isShow && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        className="stars-image"
                        alt="stars"
                      />
                    )}
                    {isShow && <p className="website">{eachValue.Password}</p>}
                  </div>
                  <button
                    data-testid="delete"
                    type="button"
                    className="del-btn"
                    onClick={() => this.deleteItem(eachValue.id)}
                   
                
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      className="del-image"
                      alt="delete"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager

// import {Component} from 'react'
// import bcrypt from 'bcryptjs'
// import {v4 as uuidv4} from 'uuid'

// import './index.css'

// class PasswordManager extends Component {
//   state = {
//     id: uuidv4(),
//     website: '',
//     userName: '',
//     password: '',
//     hashedPassword: '',
//     passwordList: [],
//     count: 0,
//     isChecked: false,
//     searchInput: '',
//   }

//   checkedBox = () => {
//     const {isChecked} = this.state
//     console.log(isChecked)
//     this.setState(prevState => ({
//       isChecked: !prevState.isChecked,
//     }))
//   }

//   onChangeSearch = event => {
//     const searchInput = event.target.value.toLowerCase()
//     this.setState({
//       searchInput: searchInput,
//     })
//   }

//   onChangeWebsite = event => {
//     this.setState({
//       website: event.target.value,
//     })
//   }

//   onChangeUsername = event => {
//     this.setState({
//       userName: event.target.value,
//     })
//   }

//   onChangePassword = event => {
//     this.setState({
//       password: event.target.value,
//     })
//   }

//   // hashPassword = async password => {
//   //   try {
//   //     const saltRounds = 10
//   //     console.log('Step 1a: Password before hashing:', password)
//   //     const hashedPassword = await bcrypt.hash(password, saltRounds)
//   //     console.log('Step 3a: Password after hashing:', hashedPassword)
//   //     return hashedPassword
//   //   } catch (error) {
//   //     console.error('Error hashing password:', error)
//   //     throw error
//   //   }
//   // }
//   handleSubmit = async event => {
//     event.preventDefault()
//     const {password, website, userName, hashedPassword} = this.state

//     console.log('Step 1a: Password before hashing (if needed):', password)

//     try {
//       const hashedPassword = await this.hashPassword(password)
//       const id = uuidv4()
//       this.setState(prevState => ({
//         passwordList: [
//           ...prevState.passwordList,
//           {
//             website: website,
//             userName: userName,
//             password: password,
//             hashedPassword: hashedPassword,
//             id: id,
//           },
//         ],
//         website: '',
//         userName: '',
//         password: '',
//         hashedPassword: '',
//       }))
//     } catch (error) {
//       console.error('Error in form submission:', error)
//     }
//   }

//   handleDelete = id => {
//     const {passwordList} = this.state
//     const filteredPasswordList = passwordList.filter(
//       eachItem => eachItem.id !== id,
//     )
//     this.setState({
//       passwordList: filteredPasswordList,
//     })
//   }
//   render() {
//     const {
//       website,
//       userName,
//       password,
//       passwordList,
//       id,
//       isChecked,
//       searchInput,
//     } = this.state
//     const searchResult = passwordList.filter(eachSearch =>
//       eachSearch.website.toLowerCase().includes(searchInput),
//     )
//     return (
//       <div className='app-container'>
//         <img
//           src='https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png'
//           className='app-logo'
//           alt='app logo'
//         />
//         <div className='add-data-container'>
//           <form className='input-container' onSubmit={this.handleSubmit}>
//             <h1 className='heading'>Add New Password</h1>
//             <div className='user-inputs'>
//               <img
//                 src='https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png'
//                 alt='website'
//                 className='input-logo'
//               />
//               <input
//                 type='text'
//                 placeholder='Enter Website'
//                 className='inputs'
//                 value={website}
//                 onChange={this.onChangeWebsite}
//               />
//             </div>
//             <div className='user-inputs'>
//               <img
//                 src='https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png'
//                 alt='username'
//                 className='input-logo'
//               />
//               <input
//                 type='text'
//                 placeholder='Enter Username'
//                 className='inputs'
//                 value={userName}
//                 onChange={this.onChangeUsername}
//               />
//             </div>
//             <div className='user-inputs'>
//               <img
//                 src='https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png'
//                 alt='password'
//                 className='input-logo'
//               />

//               <input
//                 type='password'
//                 placeholder='Enter Password'
//                 className='inputs'
//                 value={password}
//                 onChange={this.onChangePassword}
//               />
//             </div>
//             <button className='add-btn' type='submit'>
//               add
//             </button>
//           </form>
//           <img
//             src='https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png'
//             alt='password manager'
//             className='password-manager-img'
//           />
//         </div>

//         <div className='password-container'>
//           <div className='headers'>
//             <div className='password-count'>
//               <h1 className='heading'>Your Password</h1>
//               <p className='count'>{passwordList.length}</p>
//             </div>
//             <div className='user-inputs'>
//               <img
//                 src='https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png'
//                 alt='search'
//                 className='search-logo'
//               />
//               <input
//                 type='search'
//                 placeholder='Search'
//                 className='inputs'
//                 onChange={this.onChangeSearch}
//               />
//             </div>
//           </div>

//           <hr className='horizontal-line' />
//           <label htmlFor='myCheckbox' className='label'>
//             <input
//               type='checkbox'
//               id='myCheckbox'
//               className='checkbox'
//               onClick={this.checkedBox}
//             />
//             Show Passwords
//           </label>

//           <div className='password-display-container'>
//             {searchResult.map(eachData => (
//               <li className='cards' key={eachData.id}>
//                 <p className='initail'>{eachData.userName[0]}</p>
//                 <div className='data'>
//                   <p>{eachData.website}</p>
//                   <p>{eachData.userName}</p>
//                   {isChecked ? (
//                     <p>{eachData.password}</p>
//                   ) : (
//                     <p>{'*'.repeat(eachData.password?.length ?? 0)}</p>
//                   )}
//                 </div>
//                 <button
//                   className='delete-btn'
//                   onClick={() => this.handleDelete(eachData.id)}
//                 >
//                   <img
//                     src='https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png'
//                     alt='delete'
//                     className='delete-icon'
//                   />
//                 </button>
//               </li>
//             ))}
//           </div>

//           <div className='no-password-container'>
//             {passwordList.length === 0 && (
//               <img
//                 src='https://assets.ccbp.in/frontend/react-js/no-passwords-img.png'
//                 alt='no passwords'
//                 className='no-password-img'
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

// export default PasswordManager
