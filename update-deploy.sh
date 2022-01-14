#!/bin/sh

echo '1. Compressing files'
mkdir .deploy
chmod 777 .deploy
echo 'Compressing manager function folder...'
zip -j .deploy/manager.zip functions/manager/*
echo 'Compressing payments function folder...'
zip -j .deploy/payments.zip functions/payments/*
echo 'Compressing payments function folder...'
zip -j .deploy/emails.zip functions/emails/*

echo '2. Uploading files to GCP storage service...'
gsutil cp .deploy/manager.zip gs://serverless-tests
gsutil cp .deploy/payments.zip gs://serverless-tests
gsutil cp .deploy/emails.zip gs://serverless-tests
sleep 3

echo '3. Deploying...'
gcloud deployment-manager deployments update serverless \
--config deployTemplates/deploy.yaml 
echo '4. cleanning up...'
rm -r .deploy
