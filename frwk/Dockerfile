FROM ubuntu:trusty
FROM headless/ubuntu-base-java:7
# TODO tag

RUN apt-get update

RUN apt-get install -y git firefox xvfb default-jre

RUN \
  #apt-get update && \
  #gpg --keyserver http://www.freedesktop.org/software/gstreamer-sdk/sdk.gpg --recv-keys 1900C4BE
  wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
  echo "deb http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google.list && \
  apt-get update && \
  apt-get install -y google-chrome-stable && \
  rm -rf /var/lib/apt/lists/*


RUN npm install -g jasmine-node karma-firefox-launcher protractor

RUN npm update

RUN webdriver-manager update

ENV HOME /opt/protractor/project
WORKDIR /opt/protractor

COPY scripts/ /opt/protractor/scripts/

CMD ["/opt/protractor/scripts/run-e2e-tests.bash"]