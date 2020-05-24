import React, { Component } from "react"
import { LOCAL_STORAGE_CATEGORIES } from "../../../config/version"
import * as KompetisiActs from "../competition/actions"
import { getStorage, setStorage } from "../../../store/helpers/LocalStorage"
import Loadable from "react-loadable"
import { queryToObj, objToQuery } from "string-manager"
import { topLoading } from "../../components/preloaders"
import { connect } from "react-redux"
import StaticSpecialTags from "../../../store/static_data/SpecialTags"

// components
import Helmet from "../../components/Helmet"
import CompetitionLoading from "../../components/preloaders/CompetitionCardLoader"
import Modal from "../../components/modals"
import MediaPartner from "../../components/cards/MediaPartner"
import GlobalLoading from "../../components/preloaders/GlobalLoader"

const CompetitionBox = Loadable({
  loader: () => import("../../components/boxs/CompetitionBox"),
  loading: () => <CompetitionLoading withContainer />
})
const SpecialTags = Loadable({
  loader: () => import("../../components/boxs/SpecialTags"),
  loading: GlobalLoading
})

const SortText = {
  time_dsc: "Terbaru",
  prize_dsc: "Hadiah terbesar"
}

const FilterStatus = {
  active: "Masih berlangsung"
}

class Index extends Component {
  // static fetchData({ store, params, query }) {
  //   const state = generateState(query)
  //   const Filter = generateFilter(state)
  //   const Params = generateParams(state)

  //   return store.dispatch(KompetisiActs.fetchJelajah(Params, Filter))
  // }

  state = generateState(
    this.props.location.search
      ? queryToObj(this.props.location.search.replace("?", ""))
      : {},
    this.props.match.params
  )

  constructor(props) {
    super(props)
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    window.scrollTo(0, 0)

    // initial state
    this.setState(
      generateState(
        this.props.location.search
          ? queryToObj(this.props.location.search.replace("?", ""))
          : {},
        this.props.match.params
      )
    )

    // request categries data from locaStorage / api
    const Categories = getStorage(LOCAL_STORAGE_CATEGORIES)
    if (Categories) {
      this.props.dispatch(KompetisiActs.setCategories(JSON.parse(Categories)))
    } else {
      this.props.dispatch(KompetisiActs.getCategories())
    }
    // request
    this.reqData()
    //scroll event listener
    window.addEventListener("scroll", this.handleScroll, true)
  }

  UNSAFE_componentWillReceiveProps(np) {
    if (
      np.kompetisi.categories.status &&
      np.kompetisi.categories.status == 200
    ) {
      // save categories to local storage
      setStorage(
        LOCAL_STORAGE_CATEGORIES,
        JSON.stringify(np.kompetisi.categories)
      )
    }

    this.setState(
      Object.assign(
        generateState(
          np.location.search
            ? queryToObj(np.location.search.replace("?", ""))
            : {},
          np.match.params
        ),
        setCategories(np, this.state)
      ),
      () => {
        this.reqData()
      }
    )
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll, true)
  }

  handleScroll(e) {
    if (document.getElementById("browse-container")) {
      const ContainerHeight = document.getElementById("competition-container")
        .offsetHeight
      if (window.pageYOffset >= ContainerHeight - 600) this.reqMore()
    }
  }

  reqData() {
    const Filter = generateFilter(this.state)
    const Params = generateParams(this.state, this.props)
    if (!this.props.kompetisi.data[Filter]) {
      topLoading(true)
      this.props.dispatch(KompetisiActs.fetchJelajah(Params, Filter))
    }
  }

  reqMore() {
    const Filter = generateFilter(this.state)
    const Params = generateParams(this.state, this.props)
    const Kompetisi = this.props.kompetisi.data[Filter]
      ? this.props.kompetisi.data[Filter].data
      : null
    if (Kompetisi) {
      if (
        !this.props.kompetisi.data[Filter].is_loading &&
        this.props.kompetisi.data[Filter].status === 200
      ) {
        if (Params.orderby === "prize_dsc") {
          Params.lastid = Kompetisi[Kompetisi.length - 1].prize.total
        } else {
          Params.lastid = Kompetisi[Kompetisi.length - 1].id
        }
        this.props.dispatch(KompetisiActs.fetchJelajahMore(Params, Filter))
      }
    }
  }

  updateQuery(nextquery) {
    let query = queryToObj(this.props.location.search.replace("?", ""))
    query = Object.assign(query, nextquery)
    return this.props.history.push({ search: `?${objToQuery(query)}` })
  }

  render() {
    const { tag, username, main_kat, sub_kat, q, special_tags } = this.state
    const { data, categories } = this.props.kompetisi
    const filter = generateFilter(this.state)
    const query = queryToObj(this.props.location.search.replace("?", "")) || {}

    let title = "Jelajah Kompetisi"
    let description =
      "Jelajahi kompetisi dari berbagai macam kategori di Kompetisi ID"

    // jelajah kompetisi by kategori
    if (this.props.match.params.mainkat) {
      title += ` ${this.props.match.params.mainkat}`
      description = ` berdasarkan kategori ${this.props.match.params.mainkat}`
    }

    // jelajah kompetisi by sub kategori
    if (this.props.match.params.subkat) {
      title += ` - ${this.props.match.params.subkat}`
      description = ` dan subkategori ${this.props.match.params.subkat}`
    }

    //jelajah kompetisi by tag
    if (this.props.match.params.tag) {
      // ref: https://stackoverflow.com/a/20792617/2780875
      title += ` berdasarkan tag ${this.props.match.params.tag}`
      description = ` berdasarkan tag ${this.props.match.params.tag}`
    }

    //jelajah kompetisi by username
    if (username) {
      title += ` Dipasang oleh "${username}"`
      description = `Jelajahi kompetisi yang dipasang oleh "${username}"`
    }

    // jelajah media partner
    if (query.mediapartner == 1) {
      title += ` Media Partner`
      description = `Jelajahi kompetisi yang menjadikan Kompetisi.id sebagai media partner`
    }

    if (typeof window !== "undefined" && data[filter] && data[filter].meta) {
      topLoading(false)
    }

    return (
      <div id="browse-container">
        <Helmet
          title={title}
          description={description}
          url={"http://kompetisi.id/browse"}
          image="http://kompetisi.id/assets/images/wide-red-logo.png"
          keywords={`jelajah kompetisi,kompetisiid, kumpulan kompetisi,info kompetisi${
            this.props.match.params.mainkat
              ? `,kompetisi ${this.props.match.params.mainkat}`
              : ""
          }`}
        />

        {/*filter*/}
        {this.state.loading ? (
          <GlobalLoading />
        ) : special_tags && special_tags.tag ? (
          <SpecialTags {...special_tags} />
        ) : (
          <div className="col-md-12 filter-jelajah">
            <div className="container">
              {/* filter by main category and sub category */}
              <div className="row no-margin">
                <h1>
                  {" "}
                  Jelajah
                  {query.mediapartner == 1 ? " Media Partner" : ""}{" "}
                  <a
                    href="#"
                    onClick={e => {
                      e.preventDefault()
                      modal("open", "select-main-kat")
                    }}
                  >
                    {parseInt(main_kat) >= 0
                      ? categories.data[main_kat].name
                      : "Semua kategori"}
                    <i className="fa fa-angle-down" />
                  </a>
                  {parseInt(main_kat) >= 0 ? (
                    <span>
                      {" "}
                      dan{" "}
                      <a
                        href="#"
                        onClick={e => {
                          e.preventDefault()
                          modal("open", "select-sub-kat")
                        }}
                      >
                        {parseInt(sub_kat) >= 0
                          ? categories.data[main_kat].subcategories[sub_kat]
                              .name
                          : "Semua subkategori"}
                        <i className="fa fa-angle-down" />
                      </a>
                    </span>
                  ) : null}
                </h1>
              </div>

              <div className="row no-margin">
                <h1>
                  {/* sortby */}
                  Urutkan{" "}
                  <a
                    href="#"
                    onClick={e => {
                      e.preventDefault()
                      modal("open", "sort-by")
                    }}
                  >
                    {SortText[this.state.sort] || "Terbaru"}
                    <i className="fa fa-angle-down" />
                  </a>{" "}
                  {/* filter by status */}
                  Tampilkan{" "}
                  <a
                    href="#"
                    onClick={e => {
                      e.preventDefault()
                      modal("open", "filter-by-status")
                    }}
                  >
                    {FilterStatus[this.state.status] || "Semua"}
                    <i className="fa fa-angle-down" />
                  </a>
                  {tag ? ` Tag "${tag}"` : ""}
                  {q ? ` Pencarian "${q}"` : ""}
                </h1>

                {/* filter by status */}
              </div>

              <div className="row no-margin">
                <p className="text-muted">
                  Gunakan filter diatas untuk menemukan kompetisi yang sesuai
                  dengan minat kamu
                </p>
              </div>
            </div>
          </div>
        )}
        {/*end of filter*/}

        {/* media partner ads*/}
        <div className="container">
          <div className="col-md-12">
            <MediaPartner />
          </div>
        </div>
        {/* end of media partner */}

        {/*content*/}
        <CompetitionBox subtitle={true} {...data[filter]} />
        {/*end of content*/}

        {/*modal*/}
        <React.Fragment>
          {/* modal select main category */}
          <Modal id="select-main-kat">
            <div className="container">
              <div className="modal-title">
                Pilih Kategori dibawah ini
                <a
                  className="btn btn-white btn-close-modal btn-sm fas fa-times"
                  href="#"
                  onClick={e => e.preventDefault()}
                />
              </div>
              <hr />
              {categories.status && categories.status === 200 ? (
                <ul className="vertical-menu list-categories">
                  <li>
                    <a
                      href="#"
                      onClick={e => {
                        e.preventDefault()
                        this.setState({ main_kat: "" }, () => {
                          modal("close", "select-main-kat")
                          this.props.history.push(
                            `/browse${this.props.location.search}`
                          )
                        })
                      }}
                      className="text-muted"
                    >
                      semua kategori
                    </a>
                  </li>
                  {categories.data.map((n, key) => {
                    return (
                      <li key={key}>
                        <a
                          href="#"
                          onClick={e => {
                            e.preventDefault()
                            modal("close", "select-main-kat")
                            this.props.history.push(
                              `/browse/${n.name}${this.props.location.search}`
                            )
                          }}
                          className="text-muted"
                        >
                          {n.name}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              ) : (
                "loading..."
              )}
            </div>
          </Modal>

          {/* modal to set sub category */}
          <Modal id="select-sub-kat">
            <div className="container">
              <div className="modal-title">
                Pilih sub kategori dibawah ini
                <a className="btn btn-white btn-close-modal btn-sm fas fa-times" />
              </div>
              <hr />
              <ul className="vertical-menu list-categories">
                <li>
                  <a
                    href="#"
                    onClick={e => {
                      e.preventDefault()
                      this.setState({ sub_kat: "" }, () => {
                        modal("close", "select-sub-kat")
                        this.props.history.push(
                          `/browse/${categories.data[main_kat].name}${this.props.location.search}`
                        )
                      })
                    }}
                    className="text-muted"
                  >
                    Semua subkategori
                  </a>
                </li>
                {parseInt(main_kat) >= 0
                  ? categories.data[main_kat].subcategories.map((n, key) => {
                      return (
                        <li key={key}>
                          <a
                            href="#"
                            onClick={e => {
                              e.preventDefault()
                              modal("close", "select-sub-kat")
                              this.props.history.push(
                                `/browse/${categories.data[main_kat].name}/${n.name}${this.props.location.search}`
                              )
                            }}
                            className="text-muted"
                          >
                            {n.name}
                          </a>
                        </li>
                      )
                    })
                  : null}
              </ul>
            </div>
          </Modal>

          {/* modal sort-by */}
          <Modal id="sort-by">
            <div className="container">
              <div className="modal-title">
                Urutkan kompetisi berdasarkan
                <a
                  className="btn btn-white btn-close-modal btn-sm fas fa-times"
                  href="#"
                  onClick={e => e.preventDefault()}
                />
              </div>
              <hr />
              <ul className="vertical-menu list-categories">
                <li>
                  <a
                    onClick={e => {
                      e.preventDefault()
                      modal("close", "sort-by")
                      this.updateQuery({ sort: "time_dsc" })
                    }}
                    href="#"
                  >
                    Terbaru
                  </a>
                </li>
                <li>
                  <a
                    onClick={e => {
                      e.preventDefault()
                      modal("close", "sort-by")
                      this.updateQuery({ sort: "prize_dsc" })
                    }}
                    href="#"
                  >
                    Hadiah Terbesar
                  </a>
                </li>
              </ul>
            </div>
          </Modal>

          {/* modal filter-by-status */}
          <Modal id="filter-by-status">
            <div className="container">
              <div className="modal-title">
                Menampilkan kompetisi dengan status
                <a
                  className="btn btn-white btn-close-modal btn-sm fas fa-times"
                  href="#"
                  onClick={e => e.preventDefault()}
                />
              </div>
              <hr />
              <ul className="vertical-menu list-categories">
                <li>
                  <a
                    onClick={e => {
                      e.preventDefault()
                      modal("close", "filter-by-status")
                      this.updateQuery({ status: "all" })
                    }}
                    href="#"
                  >
                    Semua
                  </a>
                </li>
                <li>
                  <a
                    onClick={e => {
                      e.preventDefault()
                      modal("close", "filter-by-status")
                      this.updateQuery({ status: "active" })
                    }}
                    href="#"
                  >
                    Masih berlangsung
                  </a>
                </li>
              </ul>
            </div>
          </Modal>
        </React.Fragment>
        {/*end of modal*/}
      </div>
    )
  }
}

function setCategories(props = {}, state = {}) {
  let main_kat, sub_kat
  if (props.kompetisi.categories.status) {
    if (props.match.params.mainkat) {
      props.kompetisi.categories.data.map((n, key) => {
        if (n.name === props.match.params.mainkat) main_kat = key
      })
    } else {
      main_kat = ""
    }

    if (
      props.match.params.subkat &&
      props.kompetisi.categories.data[main_kat].subcategories
    ) {
      props.kompetisi.categories.data[main_kat].subcategories.map((n, key) => {
        if (n.name === props.match.params.subkat) sub_kat = key
      })
    } else {
      sub_kat = ""
    }
  }
  return {
    main_kat,
    sub_kat
  }
}

// function to generate react state based on httpquery
function generateState(query = {}, params = {}) {
  const { tag, username } = params
  const { orderby, mediapartner, berakhir, garansi, q, sort, status } = query

  // check if special tags
  let special_tags

  StaticSpecialTags.map(n => {
    if (n.tag === tag) special_tags = n
  })

  return {
    loading: false,
    main_kat: "",
    sub_kat: "",
    sort: sort || "time_dsc",
    q: q || "",
    tag: tag || "",
    username: username || "",
    is_mediapartner: mediapartner && mediapartner == 1,
    is_berakhir: berakhir && berakhir == 1,
    is_garansi: garansi && garansi == 1,
    status: status || "all",
    special_tags
  }
}

// function to generate params to request api
function generateParams(n = {}, props = null) {
  const {
    main_kat,
    sub_kat,
    is_mediapartner,
    is_berakhir,
    q,
    tag,
    username,
    is_garansi,
    sort,
    status
  } = n

  let Params = {}
  if (props) {
    const { categories } = props.kompetisi
    // browse competition by main category
    if (parseInt(main_kat) >= 0) Params.mainkat = categories.data[main_kat].name

    // browse competition by sub category
    if (parseInt(sub_kat) >= 0)
      Params.subkat = categories.data[main_kat].subcategories[sub_kat].name
  }

  // sort
  if (sort) Params.orderby = sort

  // filter by status
  if (status) Params.status = status

  // search competitino by keyword
  if (q) Params.search = q

  // browse competition by username
  if (username) Params.username = username

  // browse competition by tag
  if (tag) Params.tag = tag

  // browse competition filter by media partner
  if (is_mediapartner) Params.is_mediapartner = true

  // browse competition filter by ended
  if (is_berakhir) Params.is_end = true

  // browse competition filter by guaranted
  if (is_garansi) Params.is_guaranted = true

  // limit data
  Params.limit = 9

  return Params
}

// function to generate filter for store
function generateFilter(n = {}) {
  const {
    main_kat,
    sub_kat,
    is_mediapartner,
    is_berakhir,
    q,
    tag,
    is_garansi,
    sort,
    status
  } = n
  let Filter = "jelajah"
  if (parseInt(main_kat) >= 0) Filter += `_${main_kat}`
  if (parseInt(sub_kat) >= 0) Filter += `_${sub_kat}`
  if (q) Filter += `_${q}`
  if (tag) Filter += `_${tag}`
  if (sort) Filter += `_${sort}`
  if (status) Filter += `_${status}`
  Filter = `${Filter}_${is_mediapartner}_${is_berakhir}_${is_garansi}`

  return Filter
}

function mapStateToProps(state) {
  const { Kompetisi } = state

  return {
    kompetisi: Kompetisi
  }
}

export default connect(mapStateToProps)(Index)
