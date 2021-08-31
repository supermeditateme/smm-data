import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import "@fontsource/roboto";
import {
  createViewState,
  JBrowseLinearGenomeView,
} from '@jbrowse/react-linear-genome-view'

const assembly = {
  name: 'GRCh37',
  sequence: {
    type: 'ReferenceSequenceTrack',
    trackId: 'refseq_track',
    adapter: {
      type: 'BgzipFastaAdapter',
      fastaLocation: {
        uri:
          'https://jbrowse.org/genomes/hg19/fasta/hg19.fa.gz',
      },
      faiLocation: {
        uri:
          'https://jbrowse.org/genomes/hg19/fasta/hg19.fa.gz.fai',
      },
      gziLocation: {
        uri:
          'https://jbrowse.org/genomes/hg19/fasta/hg19.fa.gz.gzi',
      },
    },
  },
  "aliases": [
        "hg19"
      ],
      "refNameAliases": {
        "adapter": {
          "type": "RefNameAliasAdapter",
          "location": {
            "uri": "https://s3.amazonaws.com/jbrowse.org/genomes/hg19/hg19_aliases.txt"
          }
        }
      }
}

const tracks = [
    {
      "type": "VariantTrack",
      "trackId": "my_variants",
      "name": "My Variants",
      "assemblyNames": [
        "GRCh37"
      ],
      "adapter": {
        "type": "VcfTabixAdapter",
        "vcfGzLocation": {
          "uri": "https://bucketeer-b2ec4285-3f6c-49c8-9753-fe99a1df2ac6.s3.amazonaws.com/public/raw/dna/sample_converted.vcf.gz"
        },
        "index": {
          "location": {
            "uri": "https://bucketeer-b2ec4285-3f6c-49c8-9753-fe99a1df2ac6.s3.amazonaws.com/public/raw/dna/sample_converted.vcf.gz.tbi"
          }
        }
      },
      "textSearching": {
        "textSearchAdapter": {
          "type": "TrixTextSearchAdapter",
          "textSearchAdapterId": "GRCh37-index",
          "ixFilePath": {
            "uri": "https://bucketeer-b2ec4285-3f6c-49c8-9753-fe99a1df2ac6.s3.amazonaws.com/public/raw/dna/trix/GRCh37.ix"
          },
          "ixxFilePath": {
            "uri": "https://bucketeer-b2ec4285-3f6c-49c8-9753-fe99a1df2ac6.s3.amazonaws.com/public/raw/dna/trix/GRCh37.ixx"
          },
          "metaFilePath": {
            "uri": "https://bucketeer-b2ec4285-3f6c-49c8-9753-fe99a1df2ac6.s3.amazonaws.com/public/raw/dna/trix/GRCh37_meta.json"
          },
          "assemblies": [
            "GRCh37"
          ]
        }
      }
    }
  ]

const aggregateTextSearchAdapters = [
  {
      "type": "TrixTextSearchAdapter",
      "textSearchAdapterId": "GRCh37-index",
      "ixFilePath": {
        "uri": "https://bucketeer-b2ec4285-3f6c-49c8-9753-fe99a1df2ac6.s3.amazonaws.com/public/raw/dna/trix/GRCh37.ix"
      },
      "ixxFilePath": {
        "uri": "https://bucketeer-b2ec4285-3f6c-49c8-9753-fe99a1df2ac6.s3.amazonaws.com/public/raw/dna/trix/GRCh37.ixx"
      },
      "metaFilePath": {
        "uri": "https://bucketeer-b2ec4285-3f6c-49c8-9753-fe99a1df2ac6.s3.amazonaws.com/public/raw/dna/trix/GRCh37_meta.json"
      },
      "assemblies": [
        "GRCh37"
      ]
    }
]

const defaultSession = {
  name: 'My session',
  view: {
    id: 'linearGenomeView',
    type: 'LinearGenomeView',
    tracks: [
      {
        type: 'ReferenceSequenceTrack',
        configuration: 'refseq_track',
        displays: [
          {
            type: 'LinearReferenceSequenceDisplay',
            configuration: 'refseq_track-LinearReferenceSequenceDisplay',
          },
        ],
      },
      {
        type: 'VariantTrack',
        configuration: 'my_variants',
        displays: [
          {
            type: 'LinearVariantDisplay',
            configuration: 'my_variants-LinearVariantDisplay',
            height: 480
          },
        ],
      },
    ],
  },
}

const location = "10:29,838,737..29,838,819"

class Genomic extends React.Component {
  render() {
    const textSearchConfig = {
    assembly,
    aggregateTextSearchAdapters,
    tracks,
    defaultSession,
    location
  }


    const state = createViewState(textSearchConfig);
    return <Box p={2}>
          <Typography align="left" color="textPrimary"  paragraph >
                <Link href="/" color="secondary">&lt;&lt;  Back</Link>
          </Typography>
          <JBrowseLinearGenomeView viewState={state} />
          </Box>;
  }
}

export default Genomic;