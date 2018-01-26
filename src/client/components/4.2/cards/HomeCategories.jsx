import React, { PureComponent } from 'react'
import { Link } from 'react-router'

export default class HomeCategories extends PureComponent
{

    static defaultProps = {
        meta: {}
    }

    render()
    {
        return(
            <div className='col-md-12' style={{borderTop: '1px solid gray', borderBottom: '1px solid gray', padding: '3em 0'}}>
                <div className='container'> 
                <div className='col md-12'> 
                    <div className='header-content'> 
                    <h2>Kategori </h2>
                    <h3>Berikut beberapa ketegori kompetisi yang bisa diikuti disini.</h3>
                    </div>
                </div>
                <div className='col-md-12' style={{wordBreak: 'break-word'}}>
                    <div className='row'>
                        {
                            this.props.meta && this.props.meta.code == 200 ?
                                this.props.data.map((n, key) => (
                                    <span style={{marginRight:'10px'}} key={key}><Link to={`/browse/${n.main_kat}`}>{`${n.main_kat}(${n.count_kompetisi})`}</Link></span>
                                ))
                            : null
                        }
                    <br/>
                    <br/>
                    <Link className='btn btn-bordergray' to='/categories'>LIHAT SEMUA KATEGORI -&gt; </Link></div>
                </div>
                </div>
            </div>
        )
    }
}