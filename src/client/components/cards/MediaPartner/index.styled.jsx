import Styled from "styled-components"
import { Colors } from "../../../../config/style"

const MediaPartnerCardStyled = Styled.div`

    &.card-mediapartner {
        display: flex;
        border-top: 1px solid ${Colors.softGray};
        padding: 40px 0;

        .thumbnails {
            flex: 1;
            overflow: hidden;
            height: 150px;
            background-size: cover;
            background-repeat: no-repeat;
            border-radius: 20px;
        }

        .details {
            flex: 2;
            padding: 0 10px 0 20px;
            line-height: 1.6;
            h3 {
                margin: 10px 0 0;
            }
        }
            
        .buttons {
            float: right;
            width: 100px;
            .btn {
                display: flex;
            }
        }
        
    }

    /* responsiveness */
    /* md */
    @media only screen and (min-width: 544px) and (max-width: 767px) {
        &.card-mediapartner {
            display: block;
            padding: 15px;
            border-top: none;
            .thumbnails, .details {
                width: 100%;
            }
            .details {
                padding: 10px 0;
                h3 {
                    height: 138px;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                }
            }
                
        }
    }

    /* sm */
    @media only screen and (max-width: 543px) {
        &.card-mediapartner {
            display: block;
            padding: 15px;
            border-top: none;
            .thumbnails, .details {
                width: 100%;
            }
            .details {
                padding: 10px 0;
                h3 {
                    height: 138px;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                }
            }
                
        }
    }
`

export default MediaPartnerCardStyled
