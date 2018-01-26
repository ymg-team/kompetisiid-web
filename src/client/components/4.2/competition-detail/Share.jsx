import React, {Component} from 'react'

export default class Share extends Component 
{
    render()
    {
        const {title, desc, link} = this.props
        return(
            <div>
                <h2>Share kompetisi</h2>
                <p className='text-muted'>Bagikan ke teman-temanmu untuk meramaikan kompetisi ini.</p>
                <hr />
                <a 
                    href='javascript:;'
                    className='share share-facebook'
                    title='share ke Facebook'
                    onClick={() => {window.open(`http://www.facebook.com/sharer/sharer.php?u=${link}&title=${title}&desc=${desc}`, 'MsgWindow', 'width=500,height=400')}}>
                    <div className='share__icon'><i className='fa fa-facebook' /></div>
                    <div className='share__count'><strong>Facebook </strong>456787</div>
                </a>
                <a 
                    href='javascript:;'
                    className='share share-twitter'
                    title='share ke Twitter'
                    onClick={() => {window.open(`http://twitter.com/intent/tweet?status=${title}+${link}`, 'MsgWindow', 'width=500,height=400')}}>
                    <div className='share__icon'><i className='fa fa-twitter' /></div>
                    <div className='share__count'><strong>Twitter </strong>420879</div>
                </a>
                <a
                    href='javascript:;'
                    className='share share-linkedin'
                    title='share ke Linkedin'
                    onClick={() => {window.open(`http://www.linkedin.com/shareArticle?mini=true&url=${link}&title=${title}`, 'MsgWindow', 'width=500,height=400')}}>
                    <div className='share__icon'><i className='fa fa-linkedin' /></div>
                    <div className='share__count'><strong>Linkedin </strong>345</div>
                </a>
                {/*<a 
                    href='javascript:;'
                    className='share share-googleplus'
                    title='share ke Google Plus'>
                    <div className='share__icon'><i className='fa fa-google-plus' /></div>
                    <div className='share__count'><strong>Google+ </strong>456787</div>
                </a>*/}
                <a 
                    href='javascript:;'
                    className='share share-sebangsa'
                    title='share ke Sebangsa'
                    onClick={() => {window.open(`https://sebangsa.com/post/create?text=${link} ${title}`, 'MsgWindow', 'width=500,height=400')}}>
                    <div className='share__icon'><i className='fa fa-sebangsa' /></div>
                    <div className='share__count'><strong>Sebangsa </strong>12879</div>
                </a>
            </div>
        )
    }
}