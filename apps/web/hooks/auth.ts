import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import { API_BASE } from '../utils/constants'
import axios from 'axios'

interface UseAuthProps {
	redirectTo?: string;
	redirectIfFound?: string;
}

const fetcher = (url: string) =>
  axios.post(url, {}, {withCredentials: true})
	.then(() => {
		return true;
	}).catch(() => {
		return false;
	})


export function useAuth({ redirectTo, redirectIfFound }: UseAuthProps) {
	const { data, error, isValidating } = useSWR(
		`${API_BASE}/auth/status`, 
		fetcher
	)
	const authenticated = data

	useEffect(() => {
		if (!redirectTo || isValidating) return
		if (
			// If redirectTo is set, redirect if the user was not found.
			(redirectTo && !authenticated) ||
			// If redirectIfFound is also set, redirect if the user was found
			(redirectIfFound && authenticated)
		) {
			Router.push(redirectTo)
		}
	}, [redirectTo, redirectIfFound, isValidating, authenticated])

	return error ? null : authenticated
}