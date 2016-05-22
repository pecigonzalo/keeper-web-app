import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import RootLayout from 'layouts/RootLayout'
import MainLayout from 'layouts/MainLayout'
import NotFoundView from 'views/NotFoundView/NotFoundView'
import HomeView from 'views/HomeView/HomeView'
import ProfileView from 'views/ProfileView/ProfileView'
import LabelView from 'views/LabelView/LabelView'
import DocumentsView from 'views/DocumentsView/DocumentsView'
import DocumentView from 'views/DocumentView/DocumentView'
import BookmarkletView from 'views/BookmarkletView/BookmarkletView'

import { requireAuthentication } from 'middlewares/Authentication'

import {
  fetchProfile,
  createDocument,
  fetchDocument,
  fetchDocuments,
  fetchLabel,
  fetchLabelAndDocument,
  fetchLabelAndDocuments
} from 'middlewares/Context'

export default (store) => (
  <Route path='/' component={RootLayout}>
    <IndexRoute component={HomeView} />
    <Route path='bookmarklet' component={BookmarkletView} />
    <Route component={requireAuthentication(MainLayout)}>
      <Route path='profile' component={fetchProfile(ProfileView)} />
      <Route path='document' component={fetchDocuments(DocumentsView)} />
      <Route path='document/create' component={createDocument(DocumentView)} />
      <Route path='document/:docId' component={fetchDocument(DocumentView)} />
      <Route path='label/create' component={LabelView} />
      <Route path='label/:labelId' component={fetchLabelAndDocuments(DocumentsView)} />
      <Route path='label/:labelId/edit' component={fetchLabel(LabelView)} />
      <Route path='label/:labelId/:docId' component={fetchLabelAndDocument(DocumentView)} />
    </Route>
    <Route path='/404' component={NotFoundView} />
    <Redirect from='*' to='/404' />
  </Route>
)
