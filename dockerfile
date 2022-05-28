FROM python:3.8-alpine AS stockfish

ENV SOURCE_REPO https://github.com/official-stockfish/Stockfish
ENV VERSION master

ADD ${SOURCE_REPO}/archive/${VERSION}.tar.gz /root

WORKDIR /root

RUN tar xvzf *.tar.gz \
  && cd Stockfish-${VERSION}/src \
  && apk add --no-cache make g++ \
  && make build ARCH=x86-64-modern \
  && make install \
  && cd ../.. && rm -rf Stockfish-${VERSION} *.tar.gz

# FROM stockfish

EXPOSE 5000

COPY . /app

WORKDIR /app

RUN pip install -r requirements.txt

CMD flask run --host 0.0.0.0
