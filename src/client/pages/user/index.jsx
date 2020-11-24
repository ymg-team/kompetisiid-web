import React, { useEffect } from "react"
import Styled from "styled-components"
import Helmet from "../../components/Helmet"

import { fetchProfile } from "../../../store/user/actions"
import { connect } from "react-redux"
import { Colors } from "../../../config/style"

const UserPageStyled = Styled.div`
  &.profile {
    .profile__cover {
      display: block;
      background: ${Colors.softGray};
      background-size: cover;
    }
    .divider {
      margin-top: 300px;
    }
    .meta-container {
      color: ${Colors.mainWhite};
      background-color: ${Colors.mainGray};
      h3 {
          font-weight: normal;
      }
      .avatar {
        position: absolute;
        z-index: 5;
        top: -10px;
        img {
          width: 90px;
          height: 90px;
          border: 3px solid ${Colors.mainWhite};
          border-radius: 50%;
        }
      }
      nav.profile-nav {
        box-shadow: none;
        ul {
          li {
            display: inline-block;
            margin: 20px 20px 20px 0;
            width: 100px;
            a {
              &:hover {
                text-decoration: none;
              }
            }
            h3 {
              line-height: 1;
              margin-bottom: 5px;
              font-size: 2em;
            }
          }
        }
      }
    }
  }
`

const UserPage = props => {
  useEffect(() => {
    const { username } = props.match.params
    if (!props.profile[username]) {
      window.scrollTo(0, 0)
      props.dispatch(fetchProfile(username))
    }
  }, [props.match.params])

  const { profile } = props
  const { username } = props.match.params

  let helmetdata = {
    title: `profil ${username}`,
    description: `halaman profil ${username} di Kompetisi Id`
  }

  if (profile[username] && profile[username].status) {
    if (profile[username].status != 200) {
      helmetdata.title = "User tidak ditemukan"
      helmetdata.description = profile[username].message
      helmetdata.keywords = `Userkompetisiid,${username} kompetisi id`
    }
  }

  return (
    <UserPageStyled className="profile">
      <Helmet {...helmetdata} />
      <div className="col-md-12 no-margin no-padding profile__cover">
        <div className="row">
          <div className="col-md-12 divider"> </div>
        </div>
        <div className="row meta-container">
          <div className="container">
            <div className="col-sm-1 col-sm-push-1 col-xs-3">
              <div className="avatar">
                <img
                  src={
                    profile[username] &&
                    profile[username].data &&
                    profile[username].data.avatar
                      ? profile[username].data.avatar.original
                      : "/assets/4.2/img/avatar-default.jpg"
                  }
                />
              </div>
            </div>
            <div className="col-sm-9 col-sm-push-1 col-xs-9">
              {profile[username] && profile[username].status ? (
                profile[username].status == 200 ? (
                  <h3>
                    {profile[username].data.username}
                    &nbsp;
                    <small>
                      terdaftar {profile[username].data.register_date}
                      {/*terakhir login {epochToRelativeTime(profile[username].data.last_active)}*/}
                    </small>
                  </h3>
                ) : (
                  <h3>{profile[username].message}</h3>
                )
              ) : (
                <h3>
                  <i>...</i>
                </h3>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* {profile[username] && profile[username].status == 200 ? (
          <UserStats data={profile[username].data.competition_stats} />
        ) : null} */}
    </UserPageStyled>
  )
}

function mapStateToProps(state) {
  const { User, Kompetisi } = state
  return {
    profile: User.profile,
    kompetisi: Kompetisi.data
  }
}

export default connect(mapStateToProps)(UserPage)
