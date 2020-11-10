const { Component } = require("react");
import Evidence from "../../components/Evidence";
import Ghost from "../../components/Ghost";

class Assistant extends Component {
  state = {
    evidence: [
      {
        type: 'EMF Nivel 5', // EMF Level 5
        icon: '/emf.png'
      },
      {
        type: 'Huellas dactilares', // Fingerprints
        icon: '/fingerprint.png'
      },
      {
        type: 'Temperaturas bajo cero', // Freezing temperatures
        icon: '/freezingTemps.png'
      },
      {
        type: 'Orbes', // Ghost Orbs
        icon: '/ghostOrb.png'
      },
      {
        type: 'Escritura fantasma', // Ghost Writing
        icon: '/ghostWriting.png'
      },
      {
        type: 'Spirit Box',
        icon: '/spiritBox.png'
      },
    ],
    ghosts: [
      {
        type: 'Espíritu', // Spirit
        evidence: [
          'Huellas dactilares',
          'Escritura fantasma',
          'Spirit Box',
        ],
        weakness: 'las varillas de incienso provocan que no ataque por un largo periodo de tiempo',
        strenght: 'ninguna',
        tips: '',
      },
      {
        type: 'Espectro', // Wraith
        evidence: [
          'Huellas dactilares',
          'Temperaturas bajo cero',
          'Spirit Box'
        ],
        weakness: 'tiene reacciones tóxicas al entrar en contacto con la sal',
        strenght: 'nunca deja pisadas rastreables por el suelo',
        tips: '',
      },
      {
        type: 'Ente', // Phantom
        evidence: [
          'EMF Nivel 5',
          'Temperaturas bajo cero',
          'Orbes',
        ],
        weakness: 'fotografiar un ente hará que desaparezca temporalmente',
        strenght: 'mirar a un ente hace que tu cordura disminuya considerablemente',
        tips: '',
      },
      {
        type: 'Poltergeist',
        evidence: [
          'Spirit Box',
          'Huellas dactilares',
          'Orbes',
        ],
        weakness: 'es prácticamente inútil en una habitación vacía',
        strenght: 'puede lanzar muchos objetos a la vez',
        tips: '',
      },
      {
        type: 'Banshee',
        evidence: [
          'EMF Nivel 5',
          'Huellas dactilares',
          'Temperaturas bajo cero',
        ],
        weakness: 'temen al crucifijo haciendo que sean menos agresivas si se encuentran cerca de uno',
        strenght: 'sólo pueden marcar a un jugador una vez',
        tips: '',
      },
      {
        type: 'Jinn',
        evidence: [
          'Orbes',
          'EMF Nivel 5',
          'Spirit Box'
        ],
        weakness: 'cuando el cuadro eléctrico está apagado no puede usar su habilidad',
        strenght: 'viaja más rápido cuando mayor es la distancia enter él y la víctima',
        tips: '',
      },
      {
        type: 'Pesadilla', // Mare
        evidence: [
          'Orbes',
          'Temperaturas bajo cero',
          'Spirit Box'
        ],
        weakness: 'encender las luces hará que una pesadilla tenga menos probabilidades de atacar',
        strenght: 'tiene más probabilidades de atacar si está a oscuras',
        tips: '',
      },
      {
        type: 'Revenant',
        evidence: [
          'EMF Nivel 5',
          'Huellas dactilares',
          'Escritura fantasma'
        ],
        weakness: 'esconderte de un revenant hará que se mueva muy despacio',
        strenght: 'se desplaza más rápido si va tras su presa',
        tips: '',
      },
      {
        type: 'Sombra', // Shade
        evidence: [
          'EMF Nivel 5',
          'Escritura fantasma',
          'Orbes'
        ],
        weakness: 'no atacará si varias personas se encuentran juntas',
        strenght: 'es muy difícil de encontrar ya que es muy tímida',
        tips: '',
      },
      {
        type: 'Demonio', // Demon
        evidence: [
          'Temperaturas bajo cero',
          'Escritura fantasma',
          'Spirit Box'
        ],
        weakness: 'hacer preguntas existosas a través de la Ouija hará que la cordura no baje',
        strenght: 'atacan de manera más frecuente que otros fantasmas',
        tips: '',
      },
      {
        type: 'Yurei',
        evidence: [
          'Orbes',
          'Escritura fantasma',
          'Temperaturas bajo cero'
        ],
        weakness: 'usar varillas de incienso en su habitación hará que no se pasee por ahí en un gran periodo de tiempo',
        strenght: 'son famosos por tener un gran impacto sobre la cordura de los individuos',
        tips: '',
      },
      {
        type: 'Oni',
        evidence: [
          'EMF Nivel 5',
          'Escritura fantasma',
          'Spirit Box'
        ],
        weakness: 'al ser más activos por naturaleza son más fáciles de encontrar e identificar',
        strenght: 'son más activos cuanta más gente haya alrededor de él y tiene la capacidad de lanzar objetos a grandes velocidades',
        tips: '',
      },
    ],
    selectedEvidence: [],
  }

  handleEvidenceClick = (type) => {
    let current = this.state.selectedEvidence;
    const found = this.state.selectedEvidence.indexOf(type);
    found === -1 ? current.push(type) : current.splice(found, 1);
    this.setState({
      selectedEvidence: current,
    });
  }

  missingEvidence = (ghosts) => {
    let result = [];
    for (let i = 0; i < ghosts.length; i += 1) {
      for (let j = 0; j < this.state.selectedEvidence.length; j += 1) {
        const index = ghosts[i].evidence.indexOf(this.state.selectedEvidence[j]);
        if (index !== -1) {
          result.push(ghosts[i].evidence[index]);
        }
      }
    }
    return result;
  }

  handleReset = (e) => {
    e.preventDefault();
    this.setState({
      selectedEvidence: [],
    })
  }

  handleGhostMouseOver = (ghostType) => {
    if (!ghostType) return;

    this.resetHightlight();
    const over = this.state.ghosts.filter(g => g.type === ghostType);
    if (!over || over.length > 1) return;

    for(let i = 0; i < over[0].evidence.length; i += 1) {
      document.querySelector('button.phass__evidence[data-evidence-type="' + over[0].evidence[i] + '"]').classList.add('highlight');
    }
  }

  resetHightlight = () => {
    const buttons = document.querySelectorAll('button.phass__evidence');
    for (let i = 0; i < buttons.length; i += 1) {
      buttons[i].classList.remove('highlight');
    }
  }

  disabledEvidence = (ghosts) => {
    let current = [];
    ghosts.map(g => {
      g.evidence.map(e => {
        if (current.indexOf(e) === -1) current.push(e);
      })
    })
    return current;
  }

  render() {
    const filteredGhosts = this.state.ghosts.filter(g => {
      return this.state.selectedEvidence.every(s => g.evidence.indexOf(s) !== -1);
    })
    const availableEvidence = this.disabledEvidence(filteredGhosts);
    return (
      <div className="phass">
        <button className="phass__reset" onClick={this.handleReset} title="Reset">
          <img src="/reset.png" alt="Reset"/>
        </button>
        <div className="row">
          {this.state.evidence.map(e => (
            <Evidence
              key={e.type}
              type={e.type}
              icon={e.icon}
              disabled={availableEvidence.indexOf(e.type) === -1}
              selected={this.state.selectedEvidence.indexOf(e.type) !== -1}
              handleClick={this.handleEvidenceClick}
            />
          ))}
        </div>
        <p>Fantasmas posibles:</p>
        <div className="row" onMouseLeave={this.resetHightlight}>
          {filteredGhosts.map(g => (
            <Ghost key={g.type} {...g} handleMouseOver={this.handleGhostMouseOver} />
          ))}
        </div>
      </div>
    )
  }
}

export default Assistant;
