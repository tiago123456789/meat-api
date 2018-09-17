module.exports = {
  apps : [{
    name   : "meat-api",
    script : "./build/index.js",
    instance: 0,
    execute_mode: "cluster"
  }]
}
