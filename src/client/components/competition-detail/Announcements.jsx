import React from "react"

export default props => (
  <React.Fragment>
    <h2>Pengumuman kompetisi</h2>
    <p className="text-muted">
      Berisi pengumuman jika terjadi perubahan peraturan, detail hadiah, atau
      hal penting lainnya pada kompetisi ini.
    </p>
    <hr />
    {props.data && props.data.length > 0 ? (
      props.data.map((n, key) => {
        return (
          <div key={key} className="announcements-list">
            {key > 0 ? <hr /> : null}
            <small className="text-muted">
              {n.tgl} oleh {n.by}
            </small>
            <br />
            {n.data}
          </div>
        )
      })
    ) : (
      <p>saat ini tidak ada pengumuman</p>
    )}
  </React.Fragment>
)
