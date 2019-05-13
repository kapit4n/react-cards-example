import React from 'react';

function Album(props) {
  return (
    <div style={{ padding: 12 }}>
      {props.album.pictures.map(pict => {
        return (
          <div style={{
            padding: 12, width: 180, height: 250, display: 'inline-block', borderColor: props.album.backgroundStyle, borderWidth: 1, borderStyle: 'solid',
            verticalAlign: 'top', boxShadow: '10px 10px 8px ' + props.album.backgroundStyle
          }}>
            <img src={pict.thumbnailUrl} />
            <div>
              <div style={{ width: 150 }}>
                <a href={pict.url}>
                  {pict.title}
                </a>
              </div>
            </div>
          </div>
        )
      })
      }
    </div>
  )
}

function AlbumList(props) {
  return (
    <div>
      {props.latestAlbums.map(album => {
        return (
          <div style={{}}>
            <Album album={album} />
          </div>
        )
      })}
    </div>
  )
}

export default class Hello extends React.Component {


  constructor(props) {
    super(props);
    this.state = { latestAlbums: [], backgroundStyles: ['Green', 'Blue', 'Purple'] }
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/photos").then(function (response) {
      return response.json();
    }).then(imgs => {
      let albums = {};

      imgs.forEach(picture => {
        let albumId = picture.albumId;
        if (albums[albumId]) {
          albums[albumId].push(picture);
        } else {
          albums[albumId] = [];
          albums[albumId].push(picture);
        }
      });

      let latestKeys = Object.keys(albums).sort((x, y) => x > y).reverse().slice(0, 3)

      let latestAlbums = [];

      for (let i = 0; i < latestKeys.length; i++) {
        latestAlbums[i] = albums[latestKeys[i]].sort((x, y) => x > y).reverse().slice(0, 2);
      }

      latestAlbums = latestAlbums.map((data, index) => {
        return { backgroundStyle: this.state.backgroundStyles[index], pictures: data };
      });
      this.setState({ latestAlbums: latestAlbums })
    })
  }

  render() {
    return (
      <AlbumList latestAlbums={this.state.latestAlbums} />
    )
  }
} 
