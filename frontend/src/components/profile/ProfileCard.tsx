

const ProfileCard = () => {
  return (
    <div className="profile_container">
        <div className="top">
            <img src="" alt="" />
        </div>
        <div className="bottom">
            <div className="profile_details">
                <div className="details_left">
                    <div className="profile_name">Shaik Allabaksh</div>
                    <div className="profile_bio">Backend Developer</div>
                    <div className="address">Hyderabad,Telangana</div>
                    <div className="profile_connections">297 Connections</div>
                    <div className="profile_work">
                        <button className="open">Open to</button>
                        <button className="add_profile">Add profile section</button>
                        <button className="more">More</button>
                    </div>
                </div>
                <div className="details_right">
                    <button>pencils</button>
                    <div className="college">college</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileCard