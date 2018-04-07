import React from 'react'

const Contato = props => {
    return(

<div>
<section className='page-section cta'>
      <div className='container'>
        <div className='row'>
          <div className='col-xl-9 mx-auto'>
            <div className='cta-inner text-center rounded'>
              <h2 className='section-heading mb-5'>
                <span className='section-heading-upper'>Endereço</span>
                <span className='section-heading-lower'>Exemplo</span>
              </h2>
              
              <p className='address mb-5'>
                <em>
                  <strong>1116 Orchard Street</strong>
                  <br />
                  Barra, RJ
                </em>
              </p>
              <p className='mb-0'>
                <small>
                  <em>Ligue-nos</em>
                </small>
                <br />
                (21) 9999-9999
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    
</div>
    )
}
export default Contato