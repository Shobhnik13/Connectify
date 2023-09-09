'use client'
interface props{
    user:{
        id:string,
        objectId:string,
        username:string,
        name:string,
        bio:string,
        image:string,
    },
    btnTitle:string,
}
const AccountProfile = ({user,btnTitle}:props) => {
  return (
    <div>AccountProfile</div>
  )
}

export default AccountProfile