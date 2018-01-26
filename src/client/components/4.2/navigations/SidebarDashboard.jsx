import React,{Component} from 'react'

const SidebarDashboard = () => (
    <div className='col-md-2'>
        <div className='dashboard-sidebar'>
        <ul>
            <li className='active'> <a href='#'>Pasang Kompetisi</a></li>
            <li> <a href='#'>Kompetisi Saya<span className='label label-blue'>23</span></a></li>
            <hr />
            <li> <strong>Manajemen Kompetisi</strong></li>
            <li><a href='#'>Semua Kompetisi<span className='label label-blue'>245</span></a></li>
            <li><a href='#'>Request Pasang Cepat<span className='label label-blue'>245</span><span className='label label-red'>56</span></a></li>
            <li><a href='#'>Request Pasang Komplit<span className='label label-blue'>245</span><span className='label label-red'>12</span></a></li>
            <hr />
            <li><strong>Manajemen Berita      </strong></li>
            <li><a href='#'>Semua Berita<span className='label label-blue'>24</span></a></li>
        </ul>
        </div>
    </div>
)

export default SidebarDashboard