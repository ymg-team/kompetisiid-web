import React from "react"
import { nominalToText } from "../../helpers/number"
import { epochToDMY, epochToRelativeTime } from "../../helpers/dateTime"

// components
import MediaPartnerAds from "../cards/MediaPartnerAds"
import GAds from "../cards/GoogleAds"
import Label from "../Label"

export default props => {
  const { data } = props
  return (
    <div className="col-sm-4">
      <div className="competition-detail--meta">
        <progress value={30} max={100} />
        <h3 className="total-prize">
          <strong>{nominalToText(data.prize.total)}</strong>
          <small className="text-muted">total hadiah</small>
        </h3>
        <h3 className="total-view">
          {data.stats.views}
          <small className="text-muted">kunjungan</small>
        </h3>
        <h3 className="total-view">
          {epochToRelativeTime(data.deadline_at)}
          <small className="text-muted">{`deadline (${epochToDMY(
            data.deadline_at * 1000
          )})`}</small>
        </h3>
        <h3 className="total-view">
          {epochToRelativeTime(data.announcement_at)}
          <small className="text-muted">{`pengumuman (${epochToDMY(
            data.announcement_at * 1000
          )})`}</small>
        </h3>
      </div>
      <hr />
      <h4>Kompetisi ini bersifat</h4>
      {data.is_garansi ? (
        <Label
          type="gray"
          title="kompetisi sudah diverifikasi keberadaannya oleh kru KI"
          text="Garansi"
        />
      ) : null}
      {data.is_mediapartner ? (
        <Label
          type="gray"
          title="KI berlaku sebagai media partner di kompetisi ini"
          text="Media Partner"
        />
      ) : null}
      {data.is_support ? (
        <Label
          type="gray"
          title="kompetisi ini bisa diikuti melalui KI"
          text="Support"
        />
      ) : null}
      <br />
      <br />

      {/* media parner ads */}
      <MediaPartnerAds size="square" noads={true} />

      {/* GAds */}
      <GAds
        style={{ margin: 0 }}
        adClient="ca-pub-4468477322781117"
        adSlot={9209398500}
        timeout={1000}
      />
      {/* end of GAds */}
    </div>
  )
}
