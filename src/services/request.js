import { getToken } from './authUtils'
const mensagemErroPadrao = 'Erro ao fazer a requisição, tente novamente mais tarde.'

export const requestGet = (requestInstance, url, successCallback, errorCallback, finallyCallback, params = '', responseType = 'json') => {
  return requestInstance.get(url, {
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
    responseType: responseType,
    params: params,
  }).then((response) => {
    successCallback(response)
  })
    .catch(error => {
      var errorMessage = mensagemErroPadrao
      if (error.response) {
        if (error.response.data && error.response.data.mensagens) {
          errorMessage = error.response.data.mensagens.join(', ')
        }
      }
      errorCallback(errorMessage, error.response)
    })
    .finally(() => {
      finallyCallback()
    })
}

export const requestGetComposition = async (
  requestInstance,
  url,
  params = {},
  responseType = 'json'
) => {
  try {
    const response = await requestInstance.get(url, {
      headers: {
        Authorization: 'Bearer ' + getToken(),
      },
      responseType,
      params
    });
    return response; // Padroniza retorno

  } catch (error) {
    let errorMessage = mensagemErroPadrao;

    if (error.response?.data?.mensagens) {
      errorMessage = error.response.data.mensagens.join(', ');
    }

    throw {
      message: errorMessage,
      response: error.response
    }; // Uniformiza erros
  }
};

export const requestGetSemAutorizacao = (requestInstance, url, successCallback, errorCallback, finallyCallback, params = '', responseType = 'json') => {
  return requestInstance.get(url, {
    headers: {
    },
    responseType: responseType,
    params: params,
  }).then((response) => {
    successCallback(response)
  })
    .catch(error => {
      var errorMessage = mensagemErroPadrao
      if (error.response) {
        if (error.response.data && error.response.data.mensagens) {
          errorMessage = error.response.data.mensagens.join(', ')
        }
      }
      errorCallback(errorMessage, error.response)
    })
    .finally(() => {
      finallyCallback()
    })
}

export const requestPost = (requestInstance, url, successCallback, errorCallback, finallyCallback, data = {}, responseType = 'json', contentType = 'application/json') => {
  return requestInstance.post(url, data, {
    headers: {
      Authorization: 'Bearer ' + getToken(),
      'Content-Type': contentType,
    },
    responseType: responseType,
  }).then((response) => {
    successCallback(response)
  })
    .catch(error => {
      var errorMessage = mensagemErroPadrao
      if (error.response) {
        if (error.response.data && error.response.data.mensagens) {
          errorMessage = error.response.data.mensagens.join(', ')
        }
      }
      errorCallback(errorMessage, error)
    })
    .finally(() => {
      finallyCallback()
    })
}

export const requestPut = (requestInstance, url, successCallback, errorCallback, finallyCallback, data = {}, responseType = 'json') => {
  return requestInstance.put(url, data, {
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
    responseType: responseType,
  }).then((response) => {
    successCallback(response)
  })
    .catch(error => {
      var errorMessage = mensagemErroPadrao
      if (error.response) {
        if (error.response.data && error.response.data.mensagens) {
          errorMessage = error.response.data.mensagens.join(', ')
        }
      }
      errorCallback(errorMessage, error)
    })
    .finally(() => {
      finallyCallback()
    })
}

export const requestDelete = (requestInstance, url, successCallback, errorCallback, finallyCallback, responseType = 'json') => {
  return requestInstance.delete(url, {
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
    responseType: responseType,
  }).then((response) => {
    successCallback(response)
  })
    .catch(error => {
      var errorMessage = mensagemErroPadrao
      if (error.response) {
        if (error.response.data && error.response.data.mensagens) {
          errorMessage = error.response.data.mensagens.join(', ')
        }
      }
      errorCallback(errorMessage, error.response)
    })
    .finally(() => {
      finallyCallback()
    })
}

export const getArrayBuffer = (api, url, successCallback, errorCallback, finallyCallback = {}) => {
  url = api.baseURL + '/' + url

  var req = new XMLHttpRequest()

  req.onload = function (e) {
    var data = e.target.response
    if (this.status >= 200 && this.status < 300) {
      successCallback(data)
    } else if (this.status === 404) {
      errorCallback('Url não encontrada')
    } else {
      const enc = new TextDecoder('utf-8')
      const res = JSON.parse(enc.decode(new Uint8Array(data))) // convert to JSON object
      errorCallback(res?.mensagens[0])
    }

    finallyCallback()
  }
  req.open('GET', url)

  req.responseType = 'arraybuffer'

  req.setRequestHeader('Authorization', 'Bearer ' + getToken())
  req.send()
}
