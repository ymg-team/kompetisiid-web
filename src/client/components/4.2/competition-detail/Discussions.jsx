import React, {Component} from 'react'

export default class Discussions extends Component 
{
    componentDidMount()
    {
        this.generateFbComment()
    }

    generateFbComment()
    {
        if(window && window.FB)
        {
            console.log('reload facebook api')
            FB.XFBML.parse()
        }
    }

    render()
    {
        return(
            <div>
                <h2>Diskusi kompetisi</h2>
                <p className="text-muted">Untuk mendapatkan info lebih lanjut, mari sampaikan melalui menu diskusi ini. Diskusi bisa dijawab oleh peserta lain atau bahkan penyelenggara kompetisi sendiri.</p>
                <hr />
                <div className='row comments' id='comments'>
                    <div className='fb-comments' data-width='100%' data-href={this.props.link} data-numpost='7' />
                </div>
            </div>
        )
    }
}
