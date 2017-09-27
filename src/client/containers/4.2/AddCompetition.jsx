import React, {Component} from 'react'
import {Link} from 'react-router'
import Subheader from '../../components/4.2/Subheader'
import Helmet from '../../components/Helmet'

export const title = 'Pasang Kompetisi'
export const desc = 'Apakah kamu adalah penyelenggara kompetisi? jika iya, kamu bisa menggunakan fitur ini untuk mempulikasi kompetisimu di KompetisiIndonesia. Ada 2 cara untuk pasang kompetisi, yaitu "Pasang Cepat" dan "Pasang Komplit" untuk saat ini hanya "Pasang Cepat" yang bisa kamu coba.'

export default class AddCompetition extends Component 
{
    componentWillUnmount()
    {
        fullalert('close')
    }

    render()
    {
        return(
            <div>
                <Helmet 
                    title={title}
                    description={desc}
                />
                <Subheader 
                    title={title}
                    desc={desc}
                />
                <div className="col-md-12">
                    <div className="add-competition">
                        <div className="container">
                            <div className="col-md-12 m-20" />
                            <div className="col-md-10 col-md-push-1 m-20">
                                <div className="row">
                                    <div className="col-md-6 align-center">
                                        <h2>Kirim Kompetisi</h2>
                                        <p className="text-muted">Kamu cukup upload poster dan link untuk kemudian dicek pihak "KI" dan akan diposting jika data tersebut valid.
                                            <br/>
                                            <small>*)waktu yang dibutuhkan untuk validasi lebih lama dari pasang sendiri</small>
                                        </p>
                                        <Link to='/add/send' className="btn btn-white" title="klik untuk pasang cepat">Klik untuk kirim kompetisi</Link>
                                    </div>
                                    <div className="col-md-6 align-center">
                                        <h2>Pasang Sendiri</h2>
                                        <p className="text-muted">Login dan pasang sendiri kompetisimu melalui dashboard member. Kamu akan lebih mudah memanage kompetisi lainnya, diskusi dan memberikan pengumuman kepada para pengunjung. </p>
                                        <a href='javascript:;' onClick={() => {fullalert('warning', 'Maaf untuk saat ini, fitur ini belum tersedia')}} className="btn btn-white" title="klik untuk pasang cepat">Klik untuk pasang kompetisi</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 m-20" />
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}