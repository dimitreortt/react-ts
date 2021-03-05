import { Action } from './../actions/index'
import { ActionTypes } from './../action-types/index'
import { Dispatch } from 'redux'
import axios from 'axios'

export const searchRepositories = (term: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.SEARCH_REPOSITORIES,
    })

    try {
      const { data } = await axios.get(
        'https://registry.npmjs.org/-/v1/search',
        {
          params: {
            text: term,
          },
        }
      )

      console.log(data)
      const names = data.objects.map((result: any) => {
        return result.package.name
      })

      dispatch({
        type: ActionTypes.SEARCH_REPOSITORIES_SUCCESS,
        payload: names,
      })
    } catch (error) {
      dispatch({
        type: ActionTypes.SEARCH_REPOSITORIES_ERROR,
        payload: error.message,
      })
    }
  }
}
