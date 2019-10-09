
const MapData = {
    protocols: [
        {className: "audio", label: "Audio Signals"},
        {className: "video", label: "Video Signals"},
        {className: "webgl", label: "Realtime Graphics Renderer"},
        {className: "authoring", label: "Files - Imports & Exports"},
        {className: "code", label: "Code"},
        {className: "cv", label: "Eurorack CV Signals"},
        {className: "realtime-data", label: "Realtime Data"},
        {className: "bluetooth", label: "Bluetooth"},
        {className: "electronic", label: "Electronic"},
        {className: "physical", label: "Physically Attached"}
    ],
    groups: {

    },
    nodes: [
        {id: "MagicaVoxel", icon: true, protocol: "authoring"},
        {id: "Websocket", protocol: "realtime-data"},  
        {id: "Browser Source"},
        {id: "Syphon", protocol: "video" },
        {id: "AirServer", icon: true, protocol: "video"},
        {id: "Bluetooth", protocol: "bluetooth"},
        {id: "CV Inputs", protocol: "cv"},
        {id: "AirPlay", protocol: "video"},
        {id: "Sync In", protocol: "cv"},
        {id: "CV Triggers", protocol: "cv"},
        {id: "Arduino", icon: true, protocol: "code"},
        {
            id: "Shoebox", 
            primary: true,
            // fx: 300,
            protocol: "webgl",
            // subnodes: [
            //     {id: "Lighting"},
            //     {id: "Characters"},
            //     {id: "Dances"},
            // ]
        },
        {
            id: "EuroViz App", 
            primary: true,
            // fx: 300,
            // fy: 300,
            // subnodes: [
            //     {id: "Camera"},
            //     {id: "Polygons"},
            //     {id: "Water Shader"},
            //     {id: "Nodes"},
            // ]
        },
        {id: "EuroViz Hardware", primary: true, protocol: "electronic"},
        {id: "EuroMechanical", primary: true, protocol: "cv"},
        {id: "Magnets", protocol: "physical"},
        {id: "Discs", protocol: "physical", icon: true},
        // {id: "Sensitivity Knob", protocol: "electronic"},
        {id: "Visuals", protocol: "webgl"},
        {id: "Light Sensor", protocol: "electronic"},
        {
            id: "Live Rig", 
            primary: true,
            // fx: 300, 
            // fy: 300, 
            // subnodes: [
            //     {id: "KB37"},
            //     {id: "Kick"},
            //     {id: "Hats"},
            //     {id: "Plaits"},
            //     {id: "Yarns"},
            //     {id: "Samples"},
            //     {id: "VoiceLive"},
            // ]
        },
        {id: "Mixer", protocol: "audio"},
        {id: "Fireface", protocol: "audio"},
        {id: "OBS", icon: true, protocol: "video"},
        {id: "Ableton", icon: true, protocol: "audio"},
        {id: "Audio Recording", protocol: "audio"},
        {id: "Video Recording", protocol: "video"},
        {id: "Instagram", fx: 1700, fy: 540, icon: true},
        {id: "MIDI Sync", protocol: "realtime-data"},
        {id: "Final Cut Pro X", icon: true},
        {id: "VS Code", icon: true, protocol: "code"},
        {id: "Dance Editor", protocol: "authoring", icon: true},
        {id: "Live Renderer", protocol: "video"},
        {id: "Xcode", icon: true, protocol: "code"},
        {id: "AirDrop", protocol: "authoring"},
        {id: "Wifi", protocol: "realtime-data"},
    ],
    links: [
        {source: 'Discs', target: 'Magnets'},
        {source: 'Magnets', target: 'EuroMechanical'},
        {source: 'Light Sensor', target: 'EuroMechanical'},
        {source: 'EuroMechanical', target: 'CV Triggers'},
        {source: 'CV Triggers', target: 'Live Rig'},
        {source: 'Live Rig', target: 'Mixer', protocol: "audio"},
        {source: 'Mixer', target: 'Fireface'},
        {source: 'Fireface', target: 'Ableton'},
        {source: 'Ableton', target: 'Audio Recording'},
        {source: 'Ableton', target: 'MIDI Sync', protocol: "realtime-data"},
        {source: 'Live Rig', target: 'CV Inputs', protocol: "cv"},
        {source: 'CV Inputs', target: 'EuroViz Hardware'},
        {source: 'EuroViz Hardware', target: 'Bluetooth', protocol: "bluetooth"},
        {source: 'Bluetooth', target: 'EuroViz App'},
        {source: 'EuroViz App', target: 'Websocket', protocol: "realtime-data"},

        {source: 'Visuals', target: 'AirPlay'},
        {source: 'AirPlay', target: 'AirServer'},
        {source: 'EuroViz App', target: 'Visuals', protocol: "webgl"},
        {source: 'AirServer', target: 'Syphon'},
        {source: 'Syphon', target: 'OBS'},
        {source: 'MagicaVoxel', target: 'Shoebox'},
        {source: 'Websocket', target: 'Wifi'},
        {source: "Wifi", target: "Shoebox"},
        {source: 'Live Renderer', target: 'Browser Source'},
        {source: 'Browser Source', target: 'OBS', protocol: "video"},
        {source: 'VS Code', target: 'Shoebox'},
        {source: 'Xcode', target: 'EuroViz App'},
        {source: 'Arduino', target: 'EuroViz Hardware'},
        {source: 'OBS', target: 'Video Recording'},
        {source: 'Video Recording', target: 'Final Cut Pro X', protocol: "video authoring"},
        {source: 'Audio Recording', target: 'Final Cut Pro X', protocol: "audio authoring"},
        {source: 'AirDrop', target: 'Instagram'},
        {source: 'Dance Editor', target: 'Shoebox'},
        {source: 'Final Cut Pro X', target: 'AirDrop', protocol: "authoring"},
        {source: 'Shoebox', target: 'Live Renderer'},
        {source: 'Live Rig', target: 'Sync In', protocol: "cv"},
        {source: 'Sync In', target: 'EuroMechanical'},
        {source: 'MIDI Sync', target: 'Live Rig'},

    ]

}

export default MapData;
